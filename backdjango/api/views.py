from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json
def dictfetchall(cursor):
    # "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]
@csrf_exempt
def request_view(request):
    if request.method == 'GET':
        return get_request(request)
    # if request.method == 'POST':
    #     return post_request(request)

# @csrf_exempt
# def reqterm_view(request):
#     if request.method == 'GET':
#         return get_reqterm(request)
#     if request.method == 'POST':
#         return post_reqterm(request)
#     if request.method == 'POST':
#         return post_reqterm(request)

def get_request(request):
    usernum = request.GET.get('usernum', None)
    termyearmonth = request.GET.get('termyearmonth', None)
    reqstaging = request.GET.get('reqstaging', None)
    reqstate = request.GET.get('reqstate', None)

    if usernum is not None:
        return request_select_query("USERNUM", usernum)
    elif termyearmonth is not None:
        return request_select_query("TERMYEARMONTH", termyearmonth)
    elif reqstaging is not None:
        return request_select_query("REQSTAGING", reqstaging)
    elif reqstate is not None:
        return request_select_query("REQSTATE", reqstate)
    else:
        return request_select_query(None, None)

# def get_reqterm(request):





# def post_reqterm(request):



def request_select_query(columnname, column):
    cursor = connection.cursor()
    if columnname is None:
        query = 'select * from "REQUEST"'
    else:
        query = 'SELECT * FROM "REQUEST" WHERE "'+columnname+'"=' + column
    cursor.execute(query)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response