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
        docDetail = self.GET.get('docDetail')
        if docDetail:
            return put_put_doc(self)
        else:
            return put_doc(self)
    elif self.method == 'DELETE':
        return delete_doc(self)


@csrf_exempt
def doc_detail_view(self, DOCNUM):
    print(type(DOCNUM))
    if self.method == 'GET':
        print(type(DOCNUM))
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
        query = 'SELECT * FROM users WHERE usernum= ' + usernum
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

    try:
        # 토큰 해석
        data = data[0]["token"]
        public_key = 'very_secret'
        decoded = jwt.decode(data, public_key, algorithms='HS256')
        print(decoded)
        response = JsonResponse(decoded)

    except:
        # 토큰 생성
        # userid = '\'' + data[0]["userid"] + '\''
        # userid = '\'' + data["userid"] + '\''
        userid = data["userid"]
        userpwd = '\'' + data["userpwd"] + '\''

        cursor = connection.cursor()

        # 로그인 판단
        query = 'select usernum from users ' \
                'where userid = \'' + userid + '\' and userpwd =' + userpwd

        cursor.execute(query)

        judge = cursor.fetchall()

        if judge:
            key = 'very_secret'
            now = int(time.time())
            exp = now + 10000
            jwt_payload = {'userid': userid, 'usernum': judge[0][0], 'start_at': now, 'exp': exp}
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
    prodnum = request['prodnum']
    cartcount = request['cartcount']
    usernum = request['usernum']
    print(prodnum)

    cursor = connection.cursor()

    for num, count in zip(prodnum, cartcount):
        
        if count !=0: 
            query = 'select usernum, prodnum, cartcount from cart where usernum= ' + str(usernum) + ' and prodnum =' + str(num)
            cursor.execute(query)
            data = dictfetchall(cursor)

            if data:
                print(data[0].get('cartcount'))
                cartcountprev = data[0].get('cartcount')
                count += cartcountprev
                print(count)
                query = 'update cart set cartcount=' + str(count) + ' where prodnum = ' + str(num) + 'and usernum = ' + str(
                    usernum)
                cursor.execute(query)
            else:
                query = 'insert into cart (usernum, prodnum, cartcount) values (' + str(usernum) + ', ' + str(
                    num) + ', ' + str(count) + ')'
                cursor.execute(query)
    response = HttpResponse("성공")
    return response


def delete_cart(self):
    prodnum = self.GET.get('prodnum', None)
    prodnumList = prodnum.split(',')
    # prodnum = [10, 2]
    usernum = str(self.GET.get('usernum', None))

    print("prodnum:" + str(prodnum))
    print("prodnumList:" + str(prodnumList))
    print("usernum:" + usernum)
    cursor = connection.cursor()

    for i in prodnumList:
        query = 'DELETE FROM cart WHERE usernum=' + str(usernum) + ' and prodnum=' + str(i)
        cursor.execute(query)

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
    reqorder = self.GET.get('reqorder', None)
    usernum = self.GET.get('usernum', None)
    pagenum = self.GET.get('pagenum', None)
    
    params = {}
    if usernum is not None:
        params['u.usernum'] = usernum
    if termyearmonth is not None:
        params['r.termyearmonth'] = termyearmonth
    if reqstaging is not None:
        params['r.reqstaging'] = reqstaging
    if reqstate is not None:
        params['r.reqstate'] = reqstate
    if reqorder is not None:
        params['r.reqorder'] = reqorder
    if pagenum is not None:
        params['pagenum'] = pagenum
    return request_select_query(params)


def post_request(self):
    request = json.loads(self.body)

    prodnum = request['prodnum']
    reqcount = request['reqcount']
    reqprice = request['reqprice']
    usernum = request['usernum']
    termyearmonth = request['termyearmonth']
    cursor = connection.cursor()

    for num, count, price in zip(prodnum, reqcount, reqprice):
        query = 'insert into request (prodnum, reqcount, reqprice, usernum, termyearmonth)' \
                'values  (' + str(num) + ', ' + str(count) + ',' \
                + str(price) + ',' + str(usernum) + ' , ' + str(termyearmonth) + ')'

        cursor.execute(query)

        query = 'DELETE FROM cart WHERE usernum=' + str(usernum) + ' and prodnum=' + str(num)
        cursor.execute(query)



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
    reqnumList = reqnum.split(',')
    # usernum = str(self.GET.get('usernum', None))
    cursor = connection.cursor()
    for i in reqnumList:
        query = 'DELETE FROM request WHERE reqnum=' + str(i)
        cursor.execute(query)
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
    startdate = self.GET.get('startdate')
    enddate = self.GET.get('enddate')
    orderstate = self.GET.get('orderstate')
    ordernum = self.GET.get('ordernum')
    termyearmonth =self.GET.get('termyearmonth')
    state = self.GET.get('state')
    print(termyearmonth)
    cursor = connection.cursor()
    if (func == 'allselect'):
        query = 'SELECT * FROM "order"  WHERE "orderdate" > %s AND "orderdate" < %s AND "orderstate" = %s'
        val = ("2023-01-10", "2023-12-31", "불출완료")
        cursor.execute(query, val)
        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif (func == 'distinctordernum'):
        if (orderstate == 'allselect'):
            query = 'SELECT DISTINCT ordernum,orderdate,orderstate FROM "order" WHERE "orderdate" > %s AND "orderdate" < %s ORDER BY "ordernum" DESC'
            val = (startdate, enddate)
            cursor.execute(query, val)
        elif (orderstate == 'parchase'):
            query = 'SELECT DISTINCT ordernum,orderdate,orderstate FROM "order" WHERE "orderdate" > %s AND "orderdate" < %s AND "orderstate" = %s ORDER BY "ordernum" DESC'
            val = (startdate, enddate, "구매완료")
            cursor.execute(query, val)
        elif (orderstate == 'deliver'):
            query = 'SELECT DISTINCT ordernum,orderdate,orderstate FROM "order" WHERE "orderdate" > %s AND "orderdate" < %s AND "orderstate" = %s ORDER BY "ordernum" DESC'
            val = (startdate, enddate, "배송완료")
            cursor.execute(query, val)
        elif (orderstate == 'finish'):
            query = 'SELECT DISTINCT ordernum,orderdate,orderstate FROM "order" WHERE "orderdate" > %s AND "orderdate" < %s AND "orderstate" = %s ORDER BY "ordernum" DESC'
            val = (startdate, enddate, "불출완료")
            cursor.execute(query, val)
        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif (func == 'distinctordernumcnt'):
        resultdata = []
        textval = ['구매완료','배송완료','불출완료']
        query = 'SELECT COUNT(DISTINCT ordernum) FROM "order" WHERE "orderdate" > %s AND "orderdate" < %s '
        val = (startdate, enddate)
        cursor.execute(query,val)
        reqnumarray = dictfetchall(cursor)
        resultdata.append(reqnumarray[0]['count'])
        
        for i in textval: 
            query = 'SELECT COUNT(DISTINCT ordernum) FROM "order" WHERE "orderdate" > %s AND "orderdate" < %s AND "orderstate" = %s '
            val = (startdate, enddate, i)
            cursor.execute(query, val)
            reqnumarray = dictfetchall(cursor)
            resultdata.append(reqnumarray[0]['count'])
        response = JsonResponse(resultdata, safe=False)

    elif (func == 'reqdataget'):
        print(ordernum)
        query = 'SELECT reqnum FROM "order" WHERE "ordernum" = ' + str(ordernum)
        cursor.execute(query)
        reqnumarray = dictfetchall(cursor)
        templen = len(reqnumarray)
        print(reqnumarray)
        reqdata = []
        for i in range(0, templen):
            reqnum = reqnumarray[i]['reqnum']
            query = 'SELECT r.reqnum,r.prodnum,p.prodname,r.reqcount,r.reqprice,u.username FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE reqnum = ' + str(
                reqnum)
            cursor.execute(query)
            reqtemp = dictfetchall(cursor)
            reqdata.append(reqtemp[0])
        response = JsonResponse(reqdata, safe=False)
        
    elif (func == 'orderreq'):
        if (state == 'all'):
            print(ordernum)
            query = 'SELECT r.reqnum,r.prodnum,p.prodname,r.reqcount,r.reqprice,r.reqdate,u.username,r.reqorder FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE (reqstaging= %s  or reqstaging = %s) and termyearmonth=%s'
            val=("처리중","처리완료",termyearmonth)
            cursor.execute(query,val) 
            reqnumarray = dictfetchall(cursor)
            templen = len(reqnumarray)
            print(reqnumarray)
        elif (state == 'prevparchase'):
            print(ordernum)
            query = 'SELECT r.reqnum,r.prodnum,p.prodname,r.reqcount,r.reqprice,r.reqdate,u.username,r.reqorder FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE (reqstaging= %s  or reqstaging = %s) and termyearmonth=%s and reqorder = %s'
            val = ("처리중", "처리완료", termyearmonth,"구매전")
            cursor.execute(query, val)
            reqnumarray = dictfetchall(cursor)
            templen = len(reqnumarray)
            print(reqnumarray)
        elif (state == 'parchase'):
            print(ordernum)
            query = 'SELECT r.reqnum,r.prodnum,p.prodname,r.reqcount,r.reqprice,r.reqdate,u.username,r.reqorder FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE (reqstaging= %s  or reqstaging = %s) and termyearmonth=%s and reqorder = %s'
            val = ("처리중", "처리완료", termyearmonth,"구매완료")
            cursor.execute(query, val)
            reqnumarray = dictfetchall(cursor)
            templen = len(reqnumarray)
            print(reqnumarray)
        response = JsonResponse(reqnumarray, safe=False)
        
    elif (func == 'orderreqcount'):
        resultdata = []
        query = 'SELECT COUNT(*) FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE (reqstaging= %s  or reqstaging = %s) and termyearmonth=%s'
        val = ("처리중", "처리완료", termyearmonth)
        cursor.execute(query, val)
        reqnumarray = dictfetchall(cursor)
        resultdata.append(reqnumarray[0]['count'])
        query = 'SELECT COUNT(*) FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE (reqstaging= %s  or reqstaging = %s) and termyearmonth=%s and reqorder = %s'
        val = ("처리중", "처리완료", termyearmonth, "구매전")
        cursor.execute(query, val)
        reqnumarray = dictfetchall(cursor)
        resultdata.append(reqnumarray[0]['count'])
        query = 'SELECT COUNT(*) FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE (reqstaging= %s  or reqstaging = %s) and termyearmonth=%s and reqorder = %s'
        val = ("처리중", "처리완료", termyearmonth, "구매완료")
        cursor.execute(query, val)
        reqnumarray = dictfetchall(cursor)
        resultdata.append(reqnumarray[0]['count'])
        
        response = JsonResponse(resultdata, safe=False)
    return response


def post_order_view(self):
    request = json.loads(self.body)
    reqdata = None
    deliverdata = None
    
    try:
        reqdata = request['reqdata']
    except:
        print('data없음')
    try:
        deliverdata = request['deliverdata']
    except:
        print('deliverdata없음')
        
    if reqdata is not None and deliverdata is not None:
        # deliverdata값만있을때
        print(deliverdata)
        print(reqdata)
        orderdate = deliverdata[0],
        orderstate = "구매완료",
        orderaddr = deliverdata[1],
        ordertel = deliverdata[2],
        ordermeno = deliverdata[3]
        cursor = connection.cursor()
        query = 'SELECT Max(ordernum) FROM "order"'
        cursor.execute(query)
        orderdata = dictfetchall(cursor)
        if(orderdata[0]['max'] == None):
            orderdata[0]['max'] = 0
        ordernum = orderdata[0]['max'] + 1
        for i in reqdata:
            reqnum = i
            query = 'INSERT INTO "order" (ordernum,reqnum,orderdate, orderstate, orderaddr, ordertel, ordermemo) ' \
                            'VALUES (%s,%s, %s, %s, %s, %s,%s)'
            val = (str(ordernum), str(reqnum), orderdate, orderstate, orderaddr, ordertel, ordermeno)
            cursor.execute(query, val)
            query = 'update "request" set reqorder = %s WHERE reqnum = %s'
            val = ("구매완료", str(reqnum))
            cursor.execute(query, val)
        response = HttpResponse("성공")
        return response
    
    if deliverdata is None and reqdata is not None:
        # reqdata값만있을때
        cursor = connection.cursor()
        data = {}
        resultdata = []
        if reqdata:

            datalen = len(reqdata)
            print(datalen)
            for i in reqdata:
                reqnum = i
                query = 'SELECT r.reqnum,r.prodnum,p.prodname,r.reqcount,r.reqprice,u.username FROM request r JOIN users u on u.usernum = r.usernum JOIN product p on p.prodnum = r.prodnum WHERE reqnum = ' + str(
                    reqnum)
                cursor.execute(query)
                reqtemp = dictfetchall(cursor)
                if data.get(str(reqtemp[0]['prodnum'])):
                    temparr = data.get(str(reqtemp[0]['prodnum']))
                    temparr[2] += reqtemp[0]['reqcount']
                    temparr[3] += reqtemp[0]['reqprice']
                    data[(str(reqtemp[0]['prodnum']))] = temparr
                    print(data)
                else:
                    temparr = [reqtemp[0]['prodnum'], reqtemp[0]['prodname'], reqtemp[0]['reqcount'],
                               reqtemp[0]['reqprice']]
                    data[str(reqtemp[0]['prodnum'])] = temparr
                    print(data)
            for value in data.values():
                resultdata.append(value)
            print(resultdata)
    

   

 
    response = JsonResponse(resultdata, safe=False)
    return response


def put_order_view(self):
    request = json.loads(self.body)
    orderstate = request['orderstate']
    ordernum = request['ordernum']
    templen = len(ordernum)
    cursor = connection.cursor()
    for i in range(0, templen):

        query = 'SELECT DISTINCT orderstate FROM "order" WHERE ordernum = ' + str(ordernum[i])
        # cursor.execute(query)
        cursor.execute(query)
        data = dictfetchall(cursor)
        searchstate = data[0]['orderstate']
        if (orderstate == "deliver"):
            if (searchstate == "구매완료"):
                query = 'update "order" set orderstate = %s WHERE ordernum = %s' 
                val = ("배송완료", ordernum[i])
                cursor.execute(query, val)

        elif (orderstate == "finish"):
            if (searchstate == "배송완료"):
                query = 'update "order" set orderstate = %s WHERE ordernum = %s'
                val = ("불출완료", ordernum[i])
                cursor.execute(query, val)

                query = 'SELECT reqnum FROM "order" WHERE ordernum = ' + str(ordernum[i])
                cursor.execute(query)
                reqdata = dictfetchall(cursor)
                reqtemplen = len(reqdata)
                for i in range(0, reqtemplen):
                    reqnum = reqdata[i]['reqnum']
                    print(reqnum)
                    query = 'update "request" set reqstaging = %s WHERE reqnum = %s'
                    val = ("처리완료", str(reqnum))
                    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response


def get_doc(self):
    """
    GET
    state 조회 - 상태 별 조회 -- document/?state={상태}
    checkDetail - 중복 결재번호 걸러내고 조회 - document/?checkDetail=1
    func 조회 - 구매 대기 상태인 문서 조회 -- document/?func=DISTINCTDOCNUM
    func 조회 - 구매 대기 상태인 문서 상세 조회 -- document/?func=DISTINCTDOCNUM&REQNUMGET={docnum}
    데이터 아무것도 없을 시 - 전체 조회 -- document/
    """

    cursor = connection.cursor()

    data = self.GET.get('state')
    func = self.GET.get('func')
    startdate = self.GET.get('startdate')
    enddate = self.GET.get('enddate')
    state = self.GET.get('docstate')
    docNum = self.GET.get('docNum')

    print(startdate)
    print(enddate)
    if data:
        if data == '요청상세':
            docDetail = self.GET.get('docDetail')

            if docDetail:
                query = 'select docnum,D.reqnum , docwdate ,prodname, R.prodnum, reqcount, reqprice, docstate, docrejectreason ' \
                        ' from request R join doc D on R.reqnum = D.reqnum ' \
                        ' join product P on P.prodnum = R.prodnum' \
                        ' where doccancled = 0 and docnum =' + docDetail
            else:
                query = 'select docnum,D.reqnum , docwdate ,prodname, R.prodnum, reqcount, reqprice, docstate, docrejectreason ' \
                        ' from request R join doc D on R.reqnum = D.reqnum ' \
                        ' join product P on P.prodnum = R.prodnum' \
                        ' where docnum = (select docnum from doc order by docnum desc limit 1) ' \
                        ' order by docnum desc'
            cursor.execute(query)

            docreq = cursor.fetchall()

            docreqList = []  # 요청 번호
            prodList = []  # 상품명
            prodCount = []  # 상품갯수
            sum = 0  # 총합

            for r in docreq:
                docreqList.append(r[1])
                sum += r[6]

                if r[3] not in prodList:
                    prodList.append(r[3])
                    prodCount.append(r[5])
                else:
                    prodCount[prodList.index(r[3])] += r[5]

            wdate = docreq[0][2]  # 작성일자
            prodList = str(prodList).replace('\'', '\"')

            passString = '{"reqnum": ' + str(docreqList) + ', "wdate" : "' + str(wdate) + '", "prodname":' + str(
                prodList) + ', "prodcount":' + str(prodCount) + ', "sum":' + str(sum) + ', "docstate": "'\
                        + str(docreq[0][7]) + '", "rejectreason": "' + str(docreq[0][8]) + '"}'
            data = json.loads(passString)
            response = JsonResponse(data, safe=False)

        else:
            checkDetail = self.GET.get('checkDetail')

            if checkDetail:
                pagenum = self.GET.get('pagenum')
                docstate = '\'' + data + '\''

                if pagenum:
                    query = 'select distinct docnum, docstate, docwdate from doc where doccancled = 0 and docstate=' + docstate + ' order by docnum desc limit 10 offset ' + str((int(pagenum) - 1) * 10)
                else:
                    query = 'select distinct docnum, docstate, docwdate from doc where doccancled = 0 and docstate=' + docstate + ' order by docnum desc'
                cursor.execute(query)
            else:
                docstate = '\'' + data + '\''
                query = 'select * from doc where doccancled = 0 and docstate=' + docstate + ' order by docnum'
                cursor.execute(query)
            data = dictfetchall(cursor)
            response = JsonResponse(data, safe=False)

    elif docNum:
        query = 'select distinct docnum from doc where reqnum=' + docNum + 'order by docnum desc  limit 1';
        cursor.execute(query)
        data = dictfetchall(cursor)
        response = JsonResponse(data, safe=False)

    elif func:
        if (func == 'distinctdocnum'):
            query = 'SELECT DISTINCT docnum,docordered,docrdate FROM doc WHERE docstate = \'승인\' and docordered = 0'
            cursor.execute(query)
            data = dictfetchall(cursor)
            response = JsonResponse(data, safe=False)

        elif func == 'reqnumget':
            docstate = '\'' + "승인" + '\''
            startdate = '\'' + startdate + '\''
            enddate = '\'' + enddate + '\''
            if (state == 'all'):
                # query = 'SELECT reqnum FROM doc WHERE docstate =' + docstate + '  and docrdate >' + startdate + ' and docrdate <' + enddate + ' order by reqnum'
                query = 'SELECT r.reqnum FROM request r JOIN doc d ON r.reqnum = d.reqnum WHERE d.docstate =' + docstate + '  and d.docrdate >' + startdate + ' and d.docrdate <' + enddate + ' order by r.reqnum'
            elif (state == 'prevparchase'):
                # query = 'SELECT reqnum FROM doc WHERE docstate =' + docstate + ' and docordered = 0 and docrdate >' + startdate + ' and docrdate <' + enddate + ' order by reqnum'
                query = 'SELECT r.reqnum FROM request r JOIN doc d ON r.reqnum = d.reqnum WHERE d.docstate =' + docstate + ' and reqorder = 0 and d.docrdate >' + startdate + ' and d.docrdate <' + enddate + ' order by r.reqnum'
            elif (state == 'parchase'):
                # query = 'SELECT reqnum FROM doc WHERE docstate =' + docstate + ' and docordered = 1 and docrdate >' + startdate + ' and docrdate <' + enddate + ' order by reqnum'
                query = 'SELECT r.reqnum FROM request r JOIN doc d ON r.reqnum = d.reqnum WHERE d.docstate =' + docstate + ' and reqorder = 1 and d.docrdate >' + startdate + ' and d.docrdate <' + enddate + ' order by r.reqnum'

    else:
        checkDetail = self.GET.get('checkDetail')
        if checkDetail:
            pagenum = self.GET.get('pagenum')
            if pagenum:
                query = 'SELECT distinct docnum, docstate, docwdate FROM doc where doccancled = 0 order by docnum desc limit 10 offset ' + str((int(pagenum) - 1) * 10)
            else:
                query = 'SELECT distinct docnum, docstate, docwdate FROM doc where doccancled = 0 order by docnum'
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


# 결재문서 삭제하며 처리중을 처리 전으로 바꾸면 됨 그리고 그 전 경로로 이동 하면 됨

@csrf_exempt
def put_put_doc(self):
    cursor = connection.cursor()
    docDetail = self.GET.get('docDetail')
    data = json.loads(self.body)

    query = 'update doc set doccancled = 1 where docnum =' + str(docDetail)
    cursor.execute(query)

    docarr = data["reqnum"]

    for i in docarr:
        query = 'update request set reqstaging = \'처리전\' where reqstate = \'승인\' and reqnum =' + str(i)
        cursor.execute(query)

    response = HttpResponse("성공")
    return response

@csrf_exempt
def delete_doc(self):
    """
    DELETE
    가장 최근의 결재문서의 신청 번호 상태 변경 후 결재문서 삭제
    """
    cursor = connection.cursor()

    query = 'select reqnum from doc where docnum = (select docnum from doc order by docnum desc limit 1)'
    cursor.execute(query)

    data = cursor.fetchall()
    print(len(data))

    print(data)

    for i in range(0, len(data)):
        query = 'update request set reqstaging = \'처리전\' where reqstate = \'승인\' and reqnum = ' + str(data[i][0])
        cursor.execute(query)

    query = 'delete from DOC where docnum = (select docnum from doc order by docnum desc limit 1)'
    cursor.execute(query)
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
    paging = None
    
    if columns.get('pagenum') is not None :
        paging = columns.get('pagenum')
        del columns['pagenum']
   
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
    if paging is not None : 
        query += ' limit 10 offset ' + str((int(paging) - 1) * 10)
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


# request 테이블 update query
def request_update_query(self, pk):
    request = json.loads(self.body)
    print(request['reqstate'])
    reqstate = request['reqstate']
    reqstaging = request['reqstaging']
    reqrejectreason = request['reqrejectreason']
    # usernum = request['usernum']
    cursor = connection.cursor()
    query = 'UPDATE request ' \
            'SET reqstate = %s, reqapvdate = CURRENT_DATE, reqstaging = %s, reqrejectreason = %s  ' \
            'WHERE reqnum = %s'
    # 'WHERE reqnum = %s and usernum = %s'
    # val = (reqstate, reqstaging, reqrejectreason, pk, usernum)
    val = (reqstate, reqstaging, reqrejectreason, pk)
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


def get_category1(self):
    cursor = connection.cursor()
    query = 'SELECT * FROM CATEGORY1'
    cursor.execute(query)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response

def get_category2(self):
    category1code = self.GET.get('category1code', '')
    print(category1code)
    cursor = connection.cursor()
    
    query = 'SELECT * FROM CATEGORY2'
    if (category1code !='') : 
        query += ' WHERE CATEGORY1CODE ='+str(category1code)
    
    cursor.execute(query)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response