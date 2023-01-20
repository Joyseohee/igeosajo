# from django.views.decorators.http import require_http_methods
import bcrypt
import jwt
import time
import json
from datetime import datetime
from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet
from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_protect, csrf_exempt
import json
from django.core.serializers import serialize


def dictfetchall(cursor):
    # "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]

#장바구니 api
#장바구니 조회 api method=GET url = http://127.0.0.1:8000/api/cart_view?USERNUM=1
#장바구니 삭제 api method=DELETE url = http://127.0.0.1:8000/api/cart_view?USERNUM=1&PRODNUM=1
@csrf_exempt
def cart_view(self):
    if self.method == 'GET':
        return get_cart2(self)
    if self.method == 'DELETE':
        return delete_cart(self)
    if self.method == 'POST':
        return post_cart(self)


#상품조회 api
@csrf_exempt
def product_view(self):
    if self.method == 'GET':
        return get_product(self)




# 장바구니 전체 조회 api method=GET url = http://127.0.0.1:8000/api/cart_view?USERNUM=1
@csrf_exempt
def get_cart(self):


    usernum = self.GET.get('usernum', None)
    cursor = connection.cursor()
    query = 'SELECT * FROM "CART" WHERE "USERNUM" = %s'
    val = usernum,
    cursor.execute(query, val)
    data = dictfetchall(cursor)

    print(data)
    response = JsonResponse(data, safe=False)
    print(response)
    return response

# 장바구니 usernum 파람에 없이 전체 조회 api method=GET url = http://127.0.0.1:8000/api/cart_view?USERNUM=1
@csrf_exempt
def get_cart2(self):
    cursor = connection.cursor()
    # 토큰 해석
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiInaWQnIiwic3RhcnRfYXQiOjE2NzQxOTgwMTAsImV4cCI6MTY3NDIwODAxMH0.P9Gh3dxTHvWiryYajjLdc1XJVNOKCS_SZy_4gGGeSIM"
    public_key = 'very_secret'
    decoded = jwt.decode(token, public_key, algorithms='HS256')
    print(decoded)
    print(decoded["userid"])
    userid = decoded["userid"]

    query = 'SELECT "USERNUM" FROM "USER" WHERE "USERID" = ' +userid

    cursor.execute(query)
    data = dictfetchall(cursor)

    usernum = str(data[0]['USERNUM'])

    query = 'SELECT * FROM "CART" WHERE "USERNUM" = %s'
    val = usernum,
    cursor.execute(query, val)
    data = dictfetchall(cursor)

    print(data)
    response = JsonResponse(data, safe=False)
    print(response)
    return response



#장바구니 추가 api method=POST url= http://127.0.0.1:8000/api/cart_view
@csrf_exempt
def post_cart(self):
    request = json.loads(self.body)
    print(request)
    for req in request:
        prodnum = req['PRODNUM']
        usernum = req['USERNUM']
        cartcount = req['CARTCOUNT']
        cursor = connection.cursor()
        query = 'insert into "CART" ("PRODNUM", "USERNUM", "CARTCOUNT")' \
                'values  (%s, %s, %s)'
        val = (prodnum, usernum, cartcount)
        cursor.execute(query, val)
        print(req)

    response = HttpResponse("성공")
    return response



# @csrf_exempt
# def User2View(self):
#     if self.method == 'POST':
#         request = json.loads(self.body)
#         userid = request['USERID'],
#         username = request['USERNAME'],
#         userpwd = request['USERPWD'],
#         userathority = request['USERATHORITY'],
#         userposition = request['USERPOSITION'],
#         userdept = request['USERDEPT'],
#
#         cursor = connection.cursor()
#         query = 'INSERT INTO "USER" ("USERID", "USERPWD", "USERNAME", "USERATHORITY", "USERPOSITION", "USERDEPT") ' \
#                 'VALUES (%s, %s, %s, %s, %s, %s)'
#         val = (userid, userpwd, username, userathority, userposition, userdept)
#         cursor.execute(query, val)
#         response = HttpResponse("성공")
#
#         return response


# #장바구니 삭제 메소드
# @csrf_exempt
# def CartDeleteView(self,usernum, **kwargs):
#     print('hello')
#     if self.method == 'DELETE':
#         print('hello')
#         print(self.method)
#         print(kwargs)
#         # for key, value in kwargs.items():
#         #     print("{key} = {value}".format(key=key, value=value))
#         cursor = connection.cursor()
#         print('hello2')
#         print(usernum)
#         print(self)
#         # for key, value in usernum.items():
#         #     print('hello3')
#         #     # prodnum = key.kwargs,
#         #     usernum = value.usernum,
#         #     print(self.method)
#         #     # print(prodnum)
#         #     print(usernum)
#         #     # query = 'DELETE FROM "CART" WHERE "PRODNUM" = %s and "USERNUM" = %s'
#         #     # val = (prodnum, usernum)
#         #     # cursor.execute(query, val)
#
#         response = HttpResponse("성공")
#
#         return response



# 장바구니 삭제api url= http://127.0.0.1:8000/api/cart_view?PRODNUM=1&USERNUM=2
@csrf_exempt
def delete_cart(self):
    print(self)
    if self.method == 'DELETE':
        prodnum = str(self.GET.get('prodnum', None))
        usernum = str(self.GET.get('usernum', None))
        print(self)
        print(prodnum)
        print(usernum)
        cursor = connection.cursor()
        query = 'DELETE FROM "CART" WHERE "PRODNUM" = %s and "USERNUM" = %s'
        val = (prodnum, usernum)
        cursor.execute(query, val)
        response = HttpResponse("성공")

        return response

#신청 추가 api method=POST url = http://127.0.0.1:8000/api/post_request
@csrf_exempt
def post_request(self):
    request = json.loads(self.body)
    print(request)
    for req in request:
        prodnum = req['PRODNUM']
        reqcount = req['REQCOUNT']
        reqprice = req['REQPRICE']
        usernum = req['USERNUM']
        termyearmonth = req['TERMYEARMONTH']
        cursor = connection.cursor()
        query = 'insert into "REQUEST" ("PRODNUM", "REQCOUNT", "REQPRICE", "USERNUM", "TERMYEARMONTH")' \
                'values  (%s, %s, %s, %s, %s)'
        val = (prodnum, reqcount, reqprice, usernum, termyearmonth)
        cursor.execute(query, val)
        print(req)

    response = HttpResponse("성공")
    return response


# 신청 삭제api url= http://127.0.0.1:8000/api/delete_request?REQNUM=10
@csrf_exempt
def delete_request(self):
    print(self)
    if self.method == 'DELETE':
        reqnum = str(self.GET.get('reqnum', None))

        print(self)
        print(reqnum)
        cursor = connection.cursor()
        query = 'DELETE FROM "REQUEST" WHERE "REQNUM" = %s'
        val = reqnum,
        cursor.execute(query, val)
        response = HttpResponse("성공")

        return response


# 상품 전체 조회 api method=GET url = http://127.0.0.1:8000/api/product_view?CATEGORY2CODE=1
#url = http://127.0.0.1:8000/api/product_view?CATEGORY1CODE=1
#url = http://127.0.0.1:8000/api/product_view?CATEGORY1CODE=1&CATEGORY2CODE=1
@csrf_exempt
def get_product(self):
    category1code = self.GET.get('category1code', None)
    category2code = self.GET.get('category2code', None)
    prodname = self.GET.get('prodname', None)

    cursor = connection.cursor()
    if prodname is None and category1code is None and category2code is None:
        query = 'SELECT * FROM "PRODUCT"'
        cursor.execute(query)

    elif prodname is None and category2code is not None:
        query = 'SELECT * FROM "PRODUCT" WHERE "CATEGORY2CODE"= %s'
        val = category2code,
        cursor.execute(query, val)

    elif prodname is None and category1code is not None and category2code is None:
        query = 'SELECT "PRODNUM", "PRODNAME", "PRODPRICE", "PRODIMG" FROM "PRODUCT" INNER JOIN "CATEGORY2" ' \
                'ON "PRODUCT"."CATEGORY2CODE" = "CATEGORY2"."CATEGORY2CODE" WHERE "CATEGORY1CODE" = %s '
        val = category1code,
        cursor.execute(query, val)

    elif prodname is not None and category1code is None and category2code is None:
        query = 'SELECT * FROM "PRODUCT" WHERE "PRODNAME" LIKE %s'
        val = '%'+prodname+'%',
        cursor.execute(query, val)

    elif prodname is not None and category1code is not None and category2code is None:
        query = 'SELECT "PRODNUM", "PRODNAME", "PRODPRICE", "PRODIMG" FROM "PRODUCT" INNER JOIN "CATEGORY2" ' \
                'ON "PRODUCT"."CATEGORY2CODE" = "CATEGORY2"."CATEGORY2CODE" ' \
                'WHERE "CATEGORY1CODE" = %s and "PRODNAME" LIKE %s'
        val = (category1code, '%'+prodname+'%')
        cursor.execute(query, val)

    elif prodname is not None and category2code is not None:
        query = 'SELECT * FROM "PRODUCT" WHERE "CATEGORY2CODE"= %s and "PRODNAME" like %s'
        val = (category2code, '%'+prodname+'%')
        cursor.execute(query, val)


    data = dictfetchall(cursor)
    print(data)
    response = JsonResponse(data, safe=False)
    print(response)
    return response


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
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiInaWQnIiwic3RhcnRfYXQiOjE2NzQxOTgwMTAsImV4cCI6MTY3NDIwODAxMH0.P9Gh3dxTHvWiryYajjLdc1XJVNOKCS_SZy_4gGGeSIM"
        }
    ]
    """

    if self.method == "GET":
        response = HttpResponse("로그인 화면")

    elif self.method == "POST":

        data = json.loads(self.body)

        print(data[0])

        try:
            # 토큰 해석
            data = data[0]["token"]
            public_key = 'very_secret'
            decoded = jwt.decode(data, public_key, algorithms='HS256')
            print(decoded)
            print(decoded["userid"])
            response = HttpResponse(decoded)

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


def accesstoken(request):
    pw = '1234'
    pw_hash = bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt())

    pw_hash = pw_hash.decode('utf-8')