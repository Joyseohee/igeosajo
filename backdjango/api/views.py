# from django.views.decorators.http import require_http_methods
import json

from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

def index(request):
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
@csrf_exempt
def login(request):
    if request.method == "GET":
        # 처음 로그인 화면 띄우기
        response = HttpResponse("로그인 화면")
        # return render(request, 'users/main.html')
        return response

    elif request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
                login(request, user)
                # Redirect to a success page.
                # return HttpResponseRedirect(reverse('posts:index'))
                response = HttpResponse("성공")
                return response
        else:
            # Return an 'invalid login' error message.
            # return render(request, 'users/main.html')
            response = HttpResponse("실패")
            return response

@csrf_exempt
def doc_find(request):
    """
    GET
    state 조회 - 상태 별 조회
    func 조회 - 결재 문서 수 조회
    데이터 아무것도 없을 시 - 전체 조회

    POST
    결재 문서 요청
    [
        {
    "id":[2,4,6]
        }
    ]
    """

    cursor = connection.cursor()

    if request.method == 'GET':

        data = request.GET.get('state')
        func = request.GET.get('func')

        if data:
            docstate = '\'' + data + '\''
            query = 'select * from "DOC" where "DOCSTATE"=' + docstate

        elif func:
            if (func == 'DISTINCTDOCNUM'):
                query = 'SELECT DISTINCT "DOCNUM" FROM "DOC"'

        else:
            query = 'SELECT * FROM "DOC"'

        cursor.execute(query)

        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif request.method == 'POST':

        data = json.loads(request.body)

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
    return response


@csrf_exempt
def doc_detail(request, DOCNUM):
    """
    GET
    결재문서 상세 조회
    작성일자, 상품명, 상품코드, 신청수량,신청가격 ,진행 현황 ,반려이유

    PATCH
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

    if request.method == 'GET':

        query = 'select "DOCWDATE","PRODNAME", R."PRODNUM", "REQCOUNT", "REQPRICE", "DOCSTATE", "DOCREJECTREASON"' \
                'from "REQUEST" R join "DOC" D on R."REQNUM" = D."REQNUM" ' \
                'join "PRODUCT" P on P."PRODNUM" = R."PRODNUM" where "DOCNUM"=' + str(DOCNUM)

        cursor.execute(query)
        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif request.method == 'PATCH':

        query = 'select "REQNUM" from "DOC" where "DOCNUM"=' + str(DOCNUM)
        cursor.execute(query)

        reqnum = cursor.fetchall()

        date = datetime.today().strftime("%Y-%m-%d")
        date = '\'' + str(date) + '\''

        data = json.loads(request.body)

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

    elif request.method == 'DELETE':
        query = 'select "REQNUM" from "DOC" where "DOCNUM"=' + str(DOCNUM)
        cursor.execute(query)

        reqnum = cursor.fetchall()

        for i in reqnum:
            print(i)
            query = 'delete from "DOC" where "DOCNUM"=' + str(DOCNUM) + 'and "REQNUM"=' + str(i[0])
            cursor.execute(query)

        response = HttpResponse("성공")

    return response
