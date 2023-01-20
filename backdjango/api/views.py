from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json
def dictfetchall(cursor):
    # "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]
@csrf_exempt
def request_view(self):
    if self.method == 'GET':
        return get_request(self)
    if self.method == 'POST':
        return post_request(self)
@csrf_exempt
def request_pk_view(self, pk):
    if self.method == 'GET':
        return get_request_pk(self, pk)
    if self.method == 'PATCH':
        return patch_request_pk(self, pk)

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
    if self.method == 'PATCH':
        return patch_reqterm_pk(self, pk)

def get_request(self):
    termyearmonth = self.GET.get('termyearmonth', None)
    reqstaging = self.GET.get('reqstaging', None)
    reqstate = self.GET.get('reqstate', None)
    usernum = self.GET.get('usernum', None)
    params = {}
    if usernum is not None:
        params['U."USERNUM"'] = usernum
    if termyearmonth is not None:
        params['R."TERMYEARMONTH"'] = termyearmonth
    if reqstaging is not None:
        params['R."REQSTAGING"'] = reqstaging
    if reqstate is not None:
        params['R."REQSTATE"'] = reqstate
    return request_select_query(params)

def post_request(self):
    request = json.loads(self.body)
    for req in request:
        prodnum = req['PRODNUM']
        reqcount = req['REQCOUNT']
        reqprice = req['REQPRICE']
        usernum = req['USERNUM']
        termyearmonth = req['TERMYEARMONTH']
        cursor = connection.cursor()
        query = 'insert into "REQUEST"("PRODNUM", "REQCOUNT", "REQPRICE", "USERNUM", "TERMYEARMONTH")' \
                'values  (%s, %s, %s, %s, %s)'
        val = (prodnum, reqcount, reqprice, usernum, termyearmonth)
        cursor.execute(query, val)
    response = HttpResponse("성공")
    return response

def get_request_pk(self, pk):
    usernum = self.GET.get('usernum', None)
    params = {}
    params['R."REQNUM"'] = pk
    if usernum is not None:
        params['U."USERNUM"'] = usernum
    return request_select_query(params)

def patch_request_pk(self, pk):
    return request_update_query(self, str(pk))

def get_reqterm(self):
    request = self
    usernum = request.GET.get('usernum', None)
    termyearmonth = request.GET.get('termyearmonth', None)
    params = {}
    if usernum is not None:
        params['"USERNUM"'] = usernum
    if termyearmonth is not None:
        params['"TERMYEARMONTH"'] = termyearmonth
    return reqterm_select_query(params)

def post_reqterm(self):
    request = json.loads(self.body)
    termyearmonth = request['TERMYEARMONTH']
    termstartdate = request['TERMSTARTDATE']
    termenddate = request['TERMENDDATE']
    termavailable = request['TERMAVAILABLE']
    usernum = request['USERNUM']
    cursor = connection.cursor()
    query = 'insert into "REQTERM"' \
            'values  (%s, %s, %s, %s, %s)'
    val = (termyearmonth, termstartdate, termenddate, termavailable, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response

def get_reqterm_pk(self, pk):
    usernum = self.GET.get('usernum', None)
    params = {}
    params['"TERMYEARMONTH"'] = pk
    if usernum is not None:
        params['"USERNUM"'] = usernum
    return reqterm_select_query(params)
def patch_reqterm_pk(self, pk):
    return reqterm_update_query(self, str(pk))

# request 테이블 select query 묶음
def request_select_query(columns):
    cursor = connection.cursor()
    query = 'SELECT * FROM "REQUEST" AS R ' \
            'JOIN "USER" AS U on U."USERNUM" = R."USERNUM" ' \
            'JOIN "PRODUCT" AS P on P."PRODNUM" = R."PRODNUM" '
    val=()
    if len(columns) != 0:
        query += 'WHERE '
        i = 0
        for column in columns:
            query += column+'= %s'
            if i < len(columns)-1:
                query += ' and '
            i+=1
            val+=(columns.get(column),)
    query += ' ORDER BY "REQNUM" DESC'
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


# request 테이블 update query
def request_update_query(self, pk):
    request = json.loads(self.body)
    reqstate = request['REQSTATE']
    reqstaging = request['REQSTAGING']
    reqrejectreason = request['REQREJECTREASON']
    usernum = request['USERNUM']
    cursor = connection.cursor()
    query = 'UPDATE "REQUEST" ' \
            'SET "REQSTATE" = %s, "REQAPVDATE" = CURRENT_DATE, "REQSTAGING" = %s, "REQREJECTREASON" = %s  ' \
            'WHERE "REQNUM" = %s and "USERNUM" = %s'
    val= (reqstate, reqstaging, reqrejectreason, pk, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response

# reqterm 테이블 select query 묶음
def reqterm_select_query(columns):
    cursor = connection.cursor()
    query = 'SELECT * FROM "REQTERM"'
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
    query += ' ORDER BY "TERMYEARMONTH" DESC'
    cursor.execute(query, val)
    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response

# reqterm 테이블 update query
def reqterm_update_query(self, pk):
    request = json.loads(self.body)
    termavailable = request['TERMAVAILABLE']
    usernum = request['USERNUM']
    cursor = connection.cursor()
    query = 'UPDATE "REQTERM" SET "TERMAVAILABLE" = %s WHERE "TERMYEARMONTH"=%s AND "USERNUM"=%s'
    val = (termavailable,pk, usernum)
    cursor.execute(query, val)
    response = HttpResponse("성공")
    return response
