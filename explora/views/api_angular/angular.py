import datetime
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import io
from pandas import json_normalize
from django.views.decorators.csrf import csrf_exempt
from explora.connection.postgres import postgres_delete_query, postgres_insert_query, postgres_select_query, postgres_update_query

def userAll (request):
    obj = []
    query = "SELECT * from user"
    records = postgres_select_query(query)
    for record in records:
        obj.append({"user_login":record[1],"user_password":record[2]})

    y = json.dumps(obj)
    return HttpResponse(y)

def questionnaryAll (request):
    obj = []
    query = "SELECT * from questionnary"
    records = postgres_select_query(query)
    for record in records:
        content = record[1]
        x = json.loads(content)
        obj.append({"position":record[0],"intitule":x[0]['intitule'],"date":x[0]['date']})
    y = json.dumps(obj)
    return HttpResponse(y)

def get_questionnary (request, id_questionnary):
    obj = []
    query = "SELECT * from questionnary where id_questionnary ='"+str(id_questionnary)+"'"
    records = postgres_select_query(query)
    for record in records:
        content = record[1]
        x = json.loads(content)
        obj.append({"position":record[0],"intitule":x[0]['intitule'],"date":x[0]['date'], "content":x[0]['questions']})
    y = json.dumps(obj)
    return HttpResponse(y)

# @csrf_exempt
def save_questionnary (request, content):
    query = "INSERT INTO questionnary (content_questionnary) VALUES ('"+content+"')"
    last_id = postgres_insert_query(query)
    return HttpResponse(last_id)

# @csrf_exempt
def update_questionnary (request, id_questionnary,  content):
    query = "UPDATE questionnary set content_questionnary ='"+content+"' WHERE id_questionnary ='"+id_questionnary+"'"
    postgres_update_query(query)
    return HttpResponse({"response":"OK"})

@csrf_exempt
def delete_questionnary (request, id_questionnary):
    csrf_token = request.headers.get('X-CSRFToken')
    token_date = datetime.date.today()
    query = "select * from token where token_content ='"+str(csrf_token)+"' and token_date ='"+str(token_date)+"'"
    token = postgres_select_query(query)
    res = sum(map(len, token))
    print(res)
    print(csrf_token)
    if res == 0:
        return JsonResponse({'response':'Access denied'})
    else:    
        query = "delete from questionnary where id_questionnary ='"+str(id_questionnary)+"'"
        postgres_delete_query(query)
        return JsonResponse({'response':'Record is deleted'})


def get_csrf_token(request):
    token = get_token(request)
    token_date = datetime.date.today()
    query = "delete from token where token_date < '"+str(token_date)+"'"
    postgres_delete_query(query)
    query = "insert into token (token_content, token_date) values ('"+token+"','"+str(token_date)+"')"
    postgres_insert_query(query)
    return JsonResponse({'csrfToken': token})

def set_csrf_token(request): 
    response = HttpResponse("Cookie Set")  
    response.set_cookie('csrfToken', get_token(request))  
    return response  

###################################### Result #########################################

# @csrf_exempt
def insert_result (request, content, id_questionnary):
    query = "INSERT INTO results (content_result, id_questionnary) VALUES ('"+content+"',"+id_questionnary+")"
    last_id = postgres_insert_query(query)
    return HttpResponse(last_id)

# @csrf_exempt
# def update_result (request, id_questionnary,  content):
#     query = "UPDATE results set content_questionnary ='"+content+"' WHERE id_questionnary ='"+id_questionnary+"'"
#     postgres_update_query(query)
#     return HttpResponse({"response":"OK"})

def convert_json_to_csv(filename):
    # Récupération des données du fichier JSON et création du dataframe correspondant
    my_json_file = pd.read_json('media/'+filename)
    data = pd.DataFrame(data=my_json_file, index=None)
    # conversion des données dans un fichier CSV
    data.to_csv('media/'+filename, index= False, sep=';', encoding ='ansi')