# from django.views.decorators.http import require_http_methods
import json
import jwt
import time
import bcrypt
from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime


def index(self):
    pass


def dictfetchall(cursor):
    # "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]


# ---------------------------------------------------------------
# ---------------------------------------------------------------
# ---------------------------------------------------------------
# ---------------------------------------------------------------
# ---------------------------------------------------------------

def accesstoken(request):
    pw = '1234'
    pw_hash = bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt())

    pw_hash = pw_hash.decode('utf-8')








# ---------------------------------------------------------------
# ---------------------------------------------------------------

@csrf_exempt
def login(self):
    """
    GET
    처음 로그인 화면 띄우기
    login/
    
    POST
    json 파일을 받아 조회 후
    값이 있으면 토큰 해석
    없으면
    id, password 입력 받아 조회 후
    토큰 받아 전송
    login/
    
    [
        {
            "userid":"id2",
            "userpwd":"pwd"
            }
    ]
    
    [
        {
            "token":"생성된 토큰"
        }
    ]
    """

    if self.method == "GET":
        response = HttpResponse("로그인 화면")

    elif self.method == "POST":

        data = json.loads(self.body)
        
        print(data[0])
        
        try :
            # 토큰 해석
            data = data[0]["token"]
            public_key = 'very_secret'
            decoded = jwt.decode(data, public_key, algorithms='HS256')
            print(decoded)
            response = HttpResponse("토큰 해석 성공")

        except:
            # 토큰 생성
            userid = '\'' + data[0]["userid"] + '\''
            userpwd = '\'' + data[0]["userpwd"] + '\''

            cursor = connection.cursor()

            # 로그인 판단
            query = 'select "USERNUM" from "USER" ' \
                    'where "USERID" =' + userid + 'and "USERPWD" =' + userpwd

            cursor.execute(query)

            judge = cursor.fetchall()

            if judge:
                key = 'very_secret'
                now = int(time.time())
                exp = now + 10000
                jwt_payload = {'userid': userid, 'start_at': now, 'exp': exp}
                encoded = jwt.encode(jwt_payload, key, 'HS256')

                encoded = json.loads('[{"secretcode": "' + encoded + '"}]')
            else:
                encoded = json.loads('[{"secretcode": ""}]')
            response = HttpResponse(encoded)

    return response


@csrf_exempt
def doc_find(self):
    """
    GET
    state 조회 - 상태 별 조회 -- document/?state={상태}
    func 조회 - 구매 대기 상태인 문서 조회 -- document/?func=DISTINCTDOCNUM
    func 조회 - 구매 대기 상태인 문서 상세 조회 -- document/?func=DISTINCTDOCNUM&REQNUMGET={docnum}
    데이터 아무것도 없을 시 - 전체 조회 -- document/

    POST
    결재 문서 요청
    document/
    [
        {
    "id":[2,4,6]
        }
    ]
    
    PUT
    docordered 상태를 1로 만든다
    구매 했다는 것을 1로 표시 한다
    """

    cursor = connection.cursor()

    if self.method == 'GET':

        data = self.GET.get('state')
        func = self.GET.get('func')

        if data:
            docstate = '\'' + data + '\''
            query = 'select * from "DOC" where "DOCSTATE"=' + docstate

        elif func:
            if (func == 'DISTINCTDOCNUM'):
                query = 'SELECT DISTINCT "DOCNUM","DOCORDERED","DOCRDATE" FROM "DOC" WHERE "DOCSTATE" = \'승인\' and "DOCORDERED" = 0'
                
            elif func == 'REQNUMGET':
                docnum = self.GET.get('docnum')
                query = 'SELECT "REQNUM" FROM "DOC" WHERE "DOCNUM" =\'' + docnum + '\''

        else:
            query = 'SELECT * FROM "DOC"'

        cursor.execute(query)

        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif self.method == 'POST':

        data = json.loads(self.body)

        # 마지막 문서 번호 가져오기
        query = 'select "DOCNUM" from "DOC" order by "DOCNUM" desc limit 1'
        cursor.execute(query)

        lastnum = cursor.fetchall()[0][0] + 1
        lastnum = str(lastnum) + ','

        reqnum = data[0]['id']

        date = datetime.today().strftime("%Y-%m-%d")
        date = '\'' + str(date) + '\'' + ','

        # 삽입
        for i in reqnum:
            query = 'select "USERNUM" from "REQUEST" where "REQNUM" =' + str(i)
            cursor.execute(query)

            usernum = cursor.fetchall()[0][0]

            reqnumword = str(i) + ','
            wait = '\'대기\''
            query = 'insert into "DOC" values (' + lastnum + reqnumword + date + 'null,' + wait + ', null,' + str(
                0) + ',' + str(usernum) + ',' + str(0) + ')'
            connection.commit()

            cursor.execute(query)

        connection.close()

        response = HttpResponse("성공")

    elif self.method == 'PUT':
        request = json.loads(self.body)
        docnum = request['DOCNUM']
        ordernum = 1
        query = 'update "DOC" set "DOCORDERED" = %s WHERE "DOCNUM" = %s'
        val = (ordernum, docnum)
        cursor.execute(query, val)
        response = HttpResponse("성공")

    return response


@csrf_exempt
def doc_detail(self, DOCNUM):
    """
    GET
    document/{docnum}
    결재문서 상세 조회
    작성일자, 상품명, 상품코드, 신청수량,신청가격 ,진행 현황 ,반려이유

    PATCH
    document/{docnum}
    결재문서 상태 변경
    [
        {
        "state":"승인",
        "reject": "",
        "cancle": 0
        }
    ]

    DELETE
    결재 문서 상신 취소
    """
    cursor = connection.cursor()

    if self.method == 'GET':

        query = 'select "DOCWDATE","PRODNAME", R."PRODNUM", "REQCOUNT", "REQPRICE", "DOCSTATE", "DOCREJECTREASON"' \
                'from "REQUEST" R join "DOC" D on R."REQNUM" = D."REQNUM" ' \
                'join "PRODUCT" P on P."PRODNUM" = R."PRODNUM" where "DOCNUM"=' + str(DOCNUM)

        cursor.execute(query)
        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif self.method == 'PATCH':

        query = 'select "REQNUM" from "DOC" where "DOCNUM"=' + str(DOCNUM)
        cursor.execute(query)

        reqnum = cursor.fetchall()

        date = datetime.today().strftime("%Y-%m-%d")
        date = '\'' + str(date) + '\''

        data = json.loads(self.body)

        docstate = '\'' + data[0]['state'] + '\''

        if len(data[0]['reject']) == 0:
            rejectreason = 'null'
        else:
            rejectreason = '\'' + data[0]['reject'] + '\''

        for i in reqnum:
            query = 'update "DOC" set "DOCRDATE"=' + date + ', "DOCSTATE"=' + docstate \
                    + ', "DOCREJECTREASON"=' + rejectreason \
                    + ', "DOCCANCLED"=' + str(data[0]['cancle']) + 'where "DOCNUM"=' + str(
                DOCNUM) + 'and "REQNUM"=' + str(i[0])
            cursor.execute(query)

        response = HttpResponse("성공")

    elif self.method == 'DELETE':
        query = 'select "REQNUM" from "DOC" where "DOCNUM"=' + str(DOCNUM)
        cursor.execute(query)

        reqnum = cursor.fetchall()

        for i in reqnum:
            print(i)
            query = 'delete from "DOC" where "DOCNUM"=' + str(DOCNUM) + 'and "REQNUM"=' + str(i[0])
            cursor.execute(query)

        response = HttpResponse("성공")

    return response
