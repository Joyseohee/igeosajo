# from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, JsonResponse
from django.db import connection
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet
from django.views.decorators.csrf import csrf_protect, csrf_exempt


def dictfetchall(cursor):
    # "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]


@csrf_exempt
def OrderView(request):
    if request.method == 'POST':
        return postOrderView(request)
    if request.method == 'GET':
        return getOrderView(request)
    if request.method == 'PATCH':
        return patchOrderView(request)


def getOrderView(self):
    func = self.GET.get('func')

    cursor = connection.cursor()

    if (func == 'ALLSELECT'):
        query = 'SELECT * FROM "ORDER"'
        cursor.execute(query)
    elif (func == 'DISTINCTORDERNUM'):
        query = 'SELECT DISTINCT "ORDERNUM" FROM "ORDER"'
        cursor.execute(query)
    elif (func == 'REQNUMGET'):
        ordernum = self.GET.get('ordernum')
        query = 'SELECT "REQNUM" FROM "ORDER" WHERE "ORDERNUM" = %s'
        cursor.execute(query, ordernum)

    data = dictfetchall(cursor)
    response = JsonResponse(data, safe=False)
    return response


def patchOrderView(self):
    request = json.loads(self.body)
    ordernum = request['ORDERNUM']
    orderstate = request['ORDERSTATE']
    cursor = connection.cursor()
    query = 'update "ORDER" set "ORDERSTATE" = %s WHERE "ORDERNUM" = %s'
    val = (orderstate, ordernum)
    cursor.execute(query, val)

    if (orderstate == "불출 완료"):
        query = 'SELECT "REQNUM" FROM "ORDER" WHERE "ORDERNUM" = %s'
        cursor.execute(query, str(ordernum))
        data = dictfetchall(cursor)
        templen = len(data)
        for i in range(0, templen):
            reqnum = data[i]['REQNUM']
            query = 'update "REQUEST" set "REQSTAGING" = %s WHERE "REQNUM" = %s'
            val = ("처리완료", str(reqnum))
            cursor.execute(query, val)

    response = HttpResponse("성공")
    return response


def postOrderView(self):
    request = json.loads(self.body)
    docnum = request['DOCNUM'],
    orderdate = request['ORDERDATE'],
    orderstate = request['ORDERSTATE'],
    orderaddr = request['ORDERADDR'],
    ordertel = request['ORDERTEL'],
    ordermeno = request['ORDERMEMO']

    cursor = connection.cursor()
    query = 'SELECT Max("ORDERNUM") FROM "ORDER"'
    cursor.execute(query)
    orderdata = dictfetchall(cursor)
    ordernum = orderdata[0]['max'] + 1

    query = 'SELECT "REQNUM" FROM "DOC" WHERE "DOCNUM" = %s'
    cursor.execute(query, docnum)
    reqdata = dictfetchall(cursor)
    templen = len(reqdata)

    for i in range(0, templen):
        reqnum = reqdata[i]['REQNUM']

        query = 'INSERT INTO "ORDER" ("ORDERNUM","REQNUM","ORDERDATE", "ORDERSTATE", "ORDERADDR", "ORDERTEL", "ORDERMEMO") ' \
                'VALUES (%s,%s, %s, %s, %s, %s,%s)'

        val = (ordernum, reqnum, orderdate, orderstate, orderaddr, ordertel, ordermeno)
        cursor.execute(query, val)

    response = HttpResponse("성공")

    return response
