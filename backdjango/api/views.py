from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.db import connection
import bcrypt
import jwt
import time
from datetime import datetime
import json


def dictfetchall(cursor):
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]


@csrf_exempt
def user_view(self):
    if self.method == 'GET':
        return get_user(self)


@csrf_exempt
def login_view(self):
    if self.method == 'GET':
        return get_login(self)
    elif self.method == 'POST':
        return post_login(self)


@csrf_exempt
def cart_view(self):
    if self.method == 'GET':
        return get_cart(self)
    if self.method == 'POST':
        return post_cart(self)
    if self.method == 'DELETE':
        return delete_cart(self)


@csrf_exempt
def product_view(self):
    if self.method == 'GET':
        return get_product(self)


@csrf_exempt
def request_view(self):
    if self.method == 'GET':
        return get_request(self)
    if self.method == 'POST':
        return post_request(self)
    if self.method == 'DELETE':
        return delete_request(self)


@csrf_exempt
def request_pk_view(self, pk):
    if self.method == 'GET':
        return get_request_pk(self, pk)
    if self.method == 'PUT':
        return put_request_pk(self, pk)


@csrf_exempt
def reqterm_view(self):
    if self.method == 'GET':
        return get_reqterm(self)
    if self.method == 'POST':
        return post_reqterm(self)


@csrf_exempt
def reqterm_pk_view(self, pk):
    if self.method == 'GET':
        return get_reqterm_pk(self, pk)
    if self.method == 'PUT':
        return put_reqterm_pk(self, pk)


@csrf_exempt
def order_view(request):
    if request.method == 'POST':
        return post_order_view(request)
    if request.method == 'GET':
        return get_order_view(request)
    if request.method == 'PUT':
        return put_order_view(request)


@csrf_exempt
def doc_view(self):
    if self.method == 'GET':
        return get_doc(self)
    elif self.method == 'POST':
        return post_doc(self)
    elif self.method == 'PUT':
        return put_doc(self)


@csrf_exempt
def doc_detail_view(self, DOCNUM):
    if self.method == 'GET':
        return get_doc_detail(self, DOCNUM)
    elif self.method == 'PUT':
        return patch_doc_detail(self, DOCNUM)
    elif self.method == 'DELETE':
        return delete_doc_detail(self, DOCNUM)


def accesstoken(request):
    pw = '1234'
    pw_hash = bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt())
    pw_hash = pw_hash.decode('utf-8')


# ---------------------------------------------------------------
# ---------------------------------------------------------------

def get_user(self):
    usernum = self.GET.get('usernum', None)

    cursor = connection.cursor()
    query = ''
    if usernum is not None:
        query = 'SELECT * FROM users WHERE usernum=' + usernum
    else:
        query = 'SELECT * FROM users'
    cursor.execute(query)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


def get_login(self):
    """
    GET
    처음 로그인 화면 띄우기
    login/
    """
    response = HttpResponse("로그인 화면")
    return response


def post_login(self):
    """
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

    data = json.loads(self.body)
    print(data)

    try:
        # 토큰 해석
        data = data[0]["token"]
        public_key = 'very_secret'
        decoded = jwt.decode(data, public_key, algorithms='HS256')
        print(decoded)
        response = HttpResponse("토큰 해석 성공")

    except:
        # 토큰 생성
        # userid = '\'' + data[0]["userid"] + '\''

        userid = '\'' + data["userid"] + '\''
        userpwd = '\'' + data["userpwd"] + '\''

        cursor = connection.cursor()

        # 로그인 판단
        query = 'select usernum from users ' \
                'where userid =' + userid + 'and userpwd =' + userpwd

        cursor.execute(query)

        judge = cursor.fetchall()

        if judge:
            key = 'very_secret'
            now = int(time.time())
            exp = now + 10000
            jwt_payload = {'userid': userid, 'usernum': judge[0][0],'start_at': now, 'exp': exp}
            encoded = jwt.encode(jwt_payload, key, 'HS256')

            encoded = json.loads('{"secretcode": "' + encoded + '"}')
        else:
            encoded = json.loads('{"secretcode": "0"}')

        response = JsonResponse(encoded, safe=False)
    return response


def get_cart(self):
    usernum = self.GET.get('usernum', None)
    cursor = connection.cursor()

    query = 'SELECT *, (SELECT prodname FROM product WHERE prodnum = cartinfo.prodnum),' \
            '(SELECT prodimg FROM product WHERE prodnum = cartinfo.prodnum), ' \
            '(SELECT prodprice FROM product WHERE prodnum = cartinfo.prodnum) ' \
            'FROM cart AS cartinfo WHERE usernum = %s ORDER BY prodnum DESC'

    val = usernum,
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


def get_cart2(self):
    cursor = connection.cursor()
    # 토큰 해석
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiInaWQnIiwic3RhcnRfYXQiOjE2NzQxOTgwMTAsImV4cCI6MTY3NDIwODAxMH0.P9Gh3dxTHvWiryYajjLdc1XJVNOKCS_SZy_4gGGeSIM"
    public_key = 'very_secret'
    decoded = jwt.decode(token, public_key, algorithms='HS256')
    userid = decoded["userid"]
    query = 'SELECT usernum FROM users WHERE userid = ' + userid
    cursor.execute(query)
    data = dictfetchall(cursor)
    usernum = str(data[0]['USERNUM'])
    query = 'SELECT * FROM cart WHERE usernum = %s'
    val = usernum,
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


def post_cart(self):
    request = json.loads(self.body)
    for req in request:
        prodnum = req['prodnum']
        usernum = req['usernum']
        cartcount = req['cartcount']
        cursor = connection.cursor()
        query = 'insert into cart (prodnum, usernum, cartcount)' \
                'values  (%s, %s, %s)'
        val = (prodnum, usernum, cartcount)
        cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


def delete_cart(self):
    prodnum = str(self.GET.get('prodnum', None))
    usernum = str(self.GET.get('usernum', None))
    cursor = connection.cursor()
    query = 'DELETE FROM cart WHERE prodnum = %s and usernum = %s'
    val = (prodnum, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


@csrf_exempt
def get_product(self):
    category1code = self.GET.get('category1code', None)
    category2code = self.GET.get('category2code', None)
    prodname = self.GET.get('prodname', None)

    cursor = connection.cursor()
    if prodname is None and category1code is None and category2code is None:
        query = 'SELECT * FROM product'
        cursor.execute(query)

    elif prodname is None and category2code is not None:
        query = 'SELECT * FROM product WHERE category2code= %s'
        val = category2code,
        cursor.execute(query, val)

    elif prodname is None and category1code is not None and category2code is None:
        query = 'SELECT prodnum, prodname, prodprice, prodimg FROM product INNER JOIN category2 ' \
                'ON product.category2code = category2.category2code WHERE category1code = %s '
        val = category1code,
        cursor.execute(query, val)

    elif prodname is not None and category1code is None and category2code is None:
        query = 'SELECT * FROM product WHERE prodname LIKE %s'
        val = '%' + prodname + '%',
        cursor.execute(query, val)

    elif prodname is not None and category1code is not None and category2code is None:
        query = 'SELECT prodnum, prodname, prodprice, prodimg FROM product INNER JOIN category2 ' \
                'ON product.category2code = category2.category2code ' \
                'WHERE category1code = %s and prodname LIKE %s'
        val = (category1code, '%' + prodname + '%')
        cursor.execute(query, val)

    elif prodname is not None and category2code is not None:
        query = 'SELECT * FROM product WHERE category2code= %s and prodname like %s'
        val = (category2code, '%' + prodname + '%')
        cursor.execute(query, val)

    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


def get_request(self):
    termyearmonth = self.GET.get('termyearmonth', None)
    reqstaging = self.GET.get('reqstaging', None)
    reqstate = self.GET.get('reqstate', None)
    usernum = self.GET.get('usernum', None)
    params = {}
    if usernum is not None:
        params['u.usernum'] = usernum
    if termyearmonth is not None:
        params['r.termyearmonth'] = termyearmonth
    if reqstaging is not None:
        params['r.reqstaging'] = reqstaging
    if reqstate is not None:
        params['r.reqstate'] = reqstate
    return request_select_query(params)


def post_request(self):
    request = json.loads(self.body)
    for req in request:
        prodnum = req['prodnum']
        reqcount = req['reqcount']
        reqprice = req['reqprice']
        usernum = req['usernum']
        termyearmonth = req['termyearmonth']
        cursor = connection.cursor()
        query = 'insert into request (prodnum, reqcount, reqprice, usernum, termyearmonth)' \
                'values  (%s, %s, %s, %s, %s)'
        val = (prodnum, reqcount, reqprice, usernum, termyearmonth)
        cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


def get_request_pk(self, pk):
    usernum = self.GET.get('usernum', None)
    params = {}
    params['r.reqnum'] = pk
    if usernum is not None:
        params['u.usernum'] = usernum
    return request_select_query(params)


def put_request_pk(self, pk):
    return request_update_query(self, str(pk))


def delete_request(self):
    reqnum = str(self.GET.get('reqnum', None))
    cursor = connection.cursor()
    query = 'DELETE FROM request WHERE reqnum = %s'
    val = reqnum,
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


def get_reqterm(self):
    request = self
    usernum = request.GET.get('usernum', None)
    termyearmonth = request.GET.get('termyearmonth', None)
    params = {}
    if usernum is not None:
        params['usernum'] = usernum
    if termyearmonth is not None:
        params['termyearmonth'] = termyearmonth
    return reqterm_select_query(params)


def post_reqterm(self):
    request = json.loads(self.body)
    termyearmonth = request['termyearmonth']
    termstartdate = request['termstartdate']
    termenddate = request['termenddate']
    termavailable = request['termavailable']
    usernum = request['usernum']
    cursor = connection.cursor()
    query = 'insert into reqterm ' \
            'values (%s, %s, %s, %s, %s)'
    val = (termyearmonth, termstartdate, termenddate, termavailable, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


def get_reqterm_pk(self, pk):
    usernum = self.GET.get('usernum', None)
    params = {}
    params['termyearmonth'] = pk
    if usernum is not None:
        params['usernum'] = usernum
    return reqterm_select_query(params)


def put_reqterm_pk(self, pk):
    return reqterm_update_query(self, str(pk))


def get_order_view(self):
    func = self.GET.get('func')
    cursor = connection.cursor()
    if (func == 'ALLSELECT'):
        query = 'SELECT * FROM order'
        cursor.execute(query)
    elif (func == 'DISTINCTORDERNUM'):
        query = 'SELECT DISTINCT ordernum FROM order'
        cursor.execute(query)
    elif (func == 'REQNUMGET'):
        ordernum = self.GET.get('ordernum')
        query = 'SELECT reqnum FROM order WHERE ordernum = %s'
        cursor.execute(query, ordernum)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


def post_order_view(self):
    request = json.loads(self.body)
    docnum = request['DOCNUM'],
    orderdate = request['ORDERDATE'],
    orderstate = request['ORDERSTATE'],
    orderaddr = request['ORDERADDR'],
    ordertel = request['ORDERTEL'],
    ordermeno = request['ORDERMEMO']
    cursor = connection.cursor()
    query = 'SELECT Max(ordernum) FROM order'
    cursor.execute(query)
    orderdata = dictfetchall(cursor)
    ordernum = orderdata[0]['max'] + 1
    query = 'SELECT reqnum FROM doc WHERE docnum = %s'
    cursor.execute(query, docnum)
    reqdata = dictfetchall(cursor)
    templen = len(reqdata)

    for i in range(0, templen):
        reqnum = reqdata[i]['REQNUM']

        query = 'INSERT INTO order (ordernum,reqnum,orderdate, orderstate, orderaddr, ordertel, ordermemo) ' \
                'VALUES (%s,%s, %s, %s, %s, %s,%s)'

        val = (ordernum, reqnum, orderdate, orderstate, orderaddr, ordertel, ordermeno)
        cursor.execute(query, val)

    response = HttpResponse("성공")
    return response


def put_order_view(self):
    request = json.loads(self.body)
    ordernum = request['ordernum']
    orderstate = request['orderstate']
    cursor = connection.cursor()
    query = 'update order set orderstate = %s WHERE ordernum = %s'
    val = (orderstate, ordernum)
    cursor.execute(query, val)

    if (orderstate == "불출 완료"):
        query = 'SELECT reqnum FROM order WHERE ordernum = %s'
        cursor.execute(query, str(ordernum))
        data = dictfetchall(cursor)
        templen = len(data)
        for i in range(0, templen):
            reqnum = data[i]['reqnum']
            query = 'update request set reqstaging = %s WHERE reqnum = %s'
            val = ("처리완료", str(reqnum))
            cursor.execute(query, val)

    response = HttpResponse("성공")
    return response


def get_doc(self):
    """
    GET
    state 조회 - 상태 별 조회 -- document/?state={상태}
    func 조회 - 구매 대기 상태인 문서 조회 -- document/?func=DISTINCTDOCNUM
    func 조회 - 구매 대기 상태인 문서 상세 조회 -- document/?func=DISTINCTDOCNUM&REQNUMGET={docnum}
    데이터 아무것도 없을 시 - 전체 조회 -- document/
    """

    cursor = connection.cursor()

    data = self.GET.get('state')
    func = self.GET.get('func')

    if data:
        docstate = '\'' + data + '\''
        query = 'select * from doc where docstate=' + docstate + ' order by docnum'

    elif func:
        if (func == 'DISTINCTDOCNUM'):
            query = 'SELECT DISTINCT docnum,docordered,docrdate FROM doc WHERE docstate = \'승인\' and docordered = 0'

        elif func == 'REQNUMGET':
            docnum = self.GET.get('docnum')
            query = 'SELECT reqnum FROM doc WHERE docnum =\'' + docnum + '\' order by reqnum'

    else:
        query = 'SELECT * FROM doc order by docnum'

    cursor.execute(query)

    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)

    return response


@csrf_exempt
def post_doc(self):
    """
    POST
    결재 문서 요청
    document/
    [
        {
    "id":[2,4,6]
        }
    ]
    """

    cursor = connection.cursor()

    data = json.loads(self.body)

    # 마지막 문서 번호 가져오기
    query = 'select docnum from doc order by docnum desc limit 1'
    cursor.execute(query)

    lastnum = cursor.fetchall()[0][0] + 1
    lastnum = str(lastnum) + ','

    reqnum = data['id']

    date = datetime.today().strftime("%Y-%m-%d")
    date = '\'' + str(date) + '\'' + ','

    # 삽입
    for i in reqnum:
        query = 'select usernum from request where reqnum =' + str(i)
        cursor.execute(query)
        usernum = cursor.fetchall()[0][0]

        reqnumword = str(i) + ','
        wait = '\'대기\''
        query = 'insert into doc values (' + lastnum + reqnumword + date + 'null,' + wait + ', null,' + str(
            0) + ',' + str(usernum) + ',' + str(0) + ')'

    # 삽입
    for i in reqnum:
        query = 'select usernum from request where reqnum =' + str(i)
        cursor.execute(query)
        usernum = cursor.fetchall()[0][0]

        reqnumword = str(i) + ','
        wait = '\'대기\''
        query = 'insert into doc values (' + lastnum + reqnumword + date + 'null,' + wait + ', null,' + str(
            0) + ',' + str(usernum) + ',' + str(0) + ')'
        connection.commit()
        cursor.execute(query)

        query = 'update request set reqstaging = \'처리중\' where reqnum = ' + str(i)
        cursor.execute(query)

        connection.commit()

    connection.close()

    response = HttpResponse("성공")

    return response


@csrf_exempt
def put_doc(self):
    """
    PUT
    docordered 상태를 1로 만든다
    구매 했다는 것을 1로 표시 한다
    """
    cursor = connection.cursor()
    request = json.loads(self.body)
    docnum = request['docnum']

    print(docnum)

    ordernum = 1
    query = 'update doc set docordered = %s WHERE docnum = %s'
    val = (ordernum, docnum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


def get_doc_detail(self, DOCNUM):
    """
    GET
    document/{docnum}
    결재문서 상세 조회
    작성일자, 상품명, 상품코드, 신청수량,신청가격 ,진행 현황 ,반려이유
    """

    cursor = connection.cursor()

    query = 'select docwdate, prodname, R.prodnum, reqcount, reqprice, docstate, docrejectreason' \
            ' from request R join doc D on R.reqnum = D.reqnum' \
            ' join product P on P.prodnum = R.prodnum where docnum=' + str(DOCNUM) + 'order by docwdate'

    cursor.execute(query)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


@csrf_exempt
def patch_doc_detail(self, DOCNUM):
    """
    PUT
    document/{docnum}
    결재문서 상태 변경
    [
        {
        "state":"승인",
        "reject": "",
        "cancle": 0
        }
    ]
    """
    cursor = connection.cursor()

    query = 'select reqnum from doc where docnum=' + str(DOCNUM)
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
        query = 'update doc set docrdate=' + date + ', docstate=' + docstate \
                + ', docrejectreason=' + rejectreason \
                + ', doccancled=' + str(data[0]['cancle']) + 'where docnum=' + str(
            DOCNUM) + 'and reqnum=' + str(i[0])
        cursor.execute(query)

    response = HttpResponse("성공")
    return response


@csrf_exempt
def delete_doc_detail(self, DOCNUM):
    """
    DELETE
    결재 문서 상신 취소
    """

    cursor = connection.cursor()

    query = 'select reqnum from doc where docnum=' + str(DOCNUM)
    cursor.execute(query)

    reqnum = cursor.fetchall()

    for i in reqnum:
        query = 'delete from DOC where docnum=' + str(DOCNUM) + 'and reqnum=' + str(i[0])
        cursor.execute(query)

    response = HttpResponse("성공")
    return response


# request 테이블 select query 묶음
def request_select_query(columns):
    cursor = connection.cursor()
    query = 'SELECT * FROM request AS R ' \
            'JOIN users AS U on U.usernum = R.usernum ' \
            'JOIN product AS P on P.prodnum = R.prodnum '
    val = ()
    if len(columns) != 0:
        query += 'WHERE '
        i = 0
        for column in columns:
            query += column + '= %s'
            if i < len(columns) - 1:
                query += ' and '
            i += 1
            val += (columns.get(column),)
    query += ' ORDER BY reqnum DESC'
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response

    # request 테이블 update query


def request_update_query(self, pk):
    request = json.loads(self.body)
    reqstate = request['reqstate']
    reqstaging = request['reqstaging']
    reqrejectreason = request['reqrejectreason']
    usernum = request['usernum']
    cursor = connection.cursor()
    query = 'UPDATE request ' \
            'SET reqstate = %s, reqapvdate = CURRENT_DATE, reqstaging = %s, reqrejectreason = %s  ' \
            'WHERE reqnum = %s and usernum = %s'
    val = (reqstate, reqstaging, reqrejectreason, pk, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


# reqterm 테이블 select query 묶음
def reqterm_select_query(columns):
    cursor = connection.cursor()
    query = 'SELECT * FROM reqterm'
    val = ()
    if len(columns) != 0:
        query += ' WHERE '
        i = 0
        for column in columns:
            query += column + '= %s'
            if i < len(columns) - 1:
                query += ' and '
            i += 1
            val += (columns.get(column),)
    query += ' ORDER BY termyearmonth DESC'
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


# reqterm 테이블 update query
def reqterm_update_query(self, pk):
    request = json.loads(self.body)
    termavailable = request['termavailable']
    usernum = request['usernum']
    cursor = connection.cursor()
    query = 'UPDATE reqterm SET termavailable = %s WHERE termyearmonth=%s AND usernum=%s'
    val = (termavailable, pk, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response