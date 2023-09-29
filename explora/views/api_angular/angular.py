import datetime
import sqlite3
from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.middleware.csrf import CsrfViewMiddleware, get_token
from django.shortcuts import render
from django.template import RequestContext
import requests
import json
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from explora.connection.sqllite import sqlite_delete_query, sqlite_insert_query, sqlite_select_query, sqlite_update_query

def userAll (request):
    obj = []
    query = "SELECT * from user"
    records = sqlite_select_query(query)
    for record in records:
        obj.append({"user_login":record[1],"user_password":record[2]})

    y = json.dumps(obj)
    return HttpResponse(y)

def questionnaryAll (request):
    obj = []
    query = "SELECT * from questionnary"
    records = sqlite_select_query(query)
    for record in records:
        content = record[1]
        x = json.loads(content)
        obj.append({"position":record[0],"intitule":x[0]['intitule'],"date":x[0]['date']})
    y = json.dumps(obj)
    print(y)
    return HttpResponse(y)

def get_questionnary (request, id_questionnary):
    obj = []
    query = "SELECT * from questionnary where id_questionnary ='"+str(id_questionnary)+"'"
    records = sqlite_select_query(query)
    for record in records:
        content = record[1]
        x = json.loads(content)
        obj.append({"position":record[0],"intitule":x[0]['intitule'],"date":x[0]['date'], "content":x[0]['questions']})
    y = json.dumps(obj)
    return HttpResponse(y)

# @csrf_exempt
def save_questionnary (request, content):
    query = "INSERT INTO questionnary (content_questionnary) VALUES ('"+content+"')"
    last_id = sqlite_insert_query(query)
    return HttpResponse(last_id)

# @csrf_exempt
def update_questionnary (request, id_questionnary,  content):
    print(id_questionnary+ " - "+content)
    query = "UPDATE questionnary set content_questionnary ='"+content+"' WHERE id_questionnary ='"+id_questionnary+"'"
    sqlite_update_query(query)
    return HttpResponse({"response":"OK"})

@csrf_exempt
def delete_questionnary (request, id_questionnary):
    csrf_token = request.headers.get('X-CSRFToken')
    token_date = datetime.date.today()
    query = "select * from token where token_content ='"+str(csrf_token)+"' and token_date ='"+str(token_date)+"'"
    token = sqlite_select_query(query)
    res = sum(map(len, token))
    print(res)
    print(csrf_token)
    if res == 0:
        return JsonResponse({'response':'Access denied'})
    else:    
        query = "delete from questionnary where id_questionnary ='"+str(id_questionnary)+"'"
        sqlite_delete_query(query)
        return JsonResponse({'response':'Record is deleted'})


def get_csrf_token(request):
    token = get_token(request)
    token_date = datetime.date.today()
    query = "delete from token where token_date < '"+str(token_date)+"'"
    sqlite_delete_query(query)
    query = "insert into token (token_content, token_date) values ('"+token+"','"+str(token_date)+"')"
    sqlite_insert_query(query)
    return JsonResponse({'csrfToken': token})

def set_csrf_token(request): 
    response = HttpResponse("Cookie Set")  
    response.set_cookie('csrfToken', get_token(request))  
    return response  
