# from django.views.generic import DetailView
# from django.http import HttpResponse, JsonResponse
# from django.db import connection
# from django.views.decorators.csrf import csrf_protect, csrf_exempt
# import json
# from django.core.serializers import serialize
#
# def dictfetchall(cursor):
#     # "Returns all rows from a cursor as a dict"
#     desc = cursor.description
#     return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]



#
# @csrf_exempt
# def user_view(request):
#     if request.method == 'GET':
#         # return get_userinfo(request)
#     if request.method == 'POST':
#         return post_userinfo(request)
#
#
# def get_userinfo(self):
#     username = self.GET.get('username', None)
#     print(username)
#
#     if username is None:
#         print("오나")
#         cursor = connection.cursor()
#         query = 'select * from "USER"'
#         cursor.execute(query)
#         data = dictfetchall(cursor)
#         response = JsonResponse(data, safe=False)
#         return response
#     else:
#         cursor = connection.cursor()
#         query = 'select * from "USER" where "USERNAME"=\'' + username + '\''
#         print(query)
#         cursor.execute(query)
#         data = dictfetchall(cursor)
#         response = JsonResponse(data, safe=False)
#         return response
#
# def post_userinfo(self):
#     # print(self.body)
#     request = json.loads(self.body)
#     for req in request:
#         userid = req['USERID']
#         userpwd = req['USERPWD']
#         username = req['USERNAME']
#         userauth = req['USERATHORITY']
#         userpos = req['USERPOSITION']
#         userdept = req['USERDEPT']
#         cursor = connection.cursor()
#         query = 'INSERT INTO "USER" ("USERID", "USERPWD", "USERNAME", "USERATHORITY", "USERPOSITION", "USERDEPT") ' \
#                 'VALUES (%s, %s, %s, %s, %s, %s)'
#         val = (userid, userpwd, username, userauth, userpos, userdept)
#         cursor.execute(query, val)
#         print(req)
#     response = HttpResponse("성공")
#     return response
#
# def dictfetchall(cursor):
#     # "Returns all rows from a cursor as a dict"
#     desc = cursor.description
#     return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]
#
# def post_request(self):
#     request = json.loads(self.body)
#     print(request)
#     for req in request:
#         prodnum = req['PRODNUM']
#         reqcount = req['REQCOUNT']
#         reqprice = req['REQPRICE']
#         usernum = req['USERNUM']
#         termyearmonth = req['TERMYEARMONTH']
#         cursor = connection.cursor()
#         query = 'insert into "REQUEST"("PRODNUM", "REQCOUNT", "REQPRICE", "USERNUM", "TERMYEARMONTH")' \
#                 'values  (%s, %s, %s, %s, %s)'
#         val = (prodnum, reqcount, reqprice, usernum, termyearmonth)
#         cursor.execute(query, val)
#         print(req)
#     response = HttpResponse("성공")
#     return response