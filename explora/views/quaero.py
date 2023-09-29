from asyncio.windows_events import NULL
from multiprocessing import context
import os
import requests
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
import pandas as pd
import glob
from elasticsearch import Elasticsearch
import json
from pandas_profiling import ProfileReport
import re
from django.utils.translation import gettext as _
from explora.connection.sqllite import sqlite_delete_query, sqlite_insert_query, sqlite_select_query
import pandas as pd
import itertools
from datetime import datetime

from explora.services.quaero import liste_destinataire

def login (request):
    return render(request, 'quaero/login.html')

def new_questionnary(request):
    if 'email' in request.session:
        return render(request,'quaero/new_questionnary.html')     
    else:
        return render(request,'quaero/login.html')
        
def save_questionnary (request):
    id_questionnary = str(request.GET.get('id_questionnary'))
    content = str(request.GET.get('content'))
    content = content.replace("'","’")
    if(id_questionnary==""):
        query = "insert into questionnary (content_questionnary) values ('"+content+"')"
        last_id = sqlite_insert_query(query)
    else:
        query = "update questionnary set content_questionnary ='"+content+"' where id_questionnary ="+id_questionnary
        last_id = sqlite_insert_query(query)
        last_id = id_questionnary
    return HttpResponse(last_id)

def my_questionnary(request):
    context={}
    list_q =[]
    query = "select id_questionnary, content_questionnary from questionnary order by id_questionnary desc"
    list_questionnary = sqlite_select_query(query)
    for questionnary in list_questionnary:
        y=json.loads(questionnary[1])
        list_q.append((questionnary[0],y[0]['intitule'],y[0]['date']))
    context['list_questionnary'] = list_q
    return render(request,'quaero/my_questionnary.html', context)

def publish_questionnary(request):
    context={}
    liste_destinataire = []
    query = "select nom_liste_destinataire from liste_destinataire order by nom_liste_destinataire asc"
    listes = sqlite_select_query(query)
    for liste in listes:
        liste_destinataire.append(liste[0])
    my_liste = '|*>|<*|'.join(liste_destinataire)
    context['liste_destinataire'] = my_liste
    return render(request,'quaero/publication.html', context)

def telecharger_list_destinataires_csv(request):
    """
    1- upload working file (csv only)
    2- storage of the file in the media directory
    3- read the uploaded file (fileUploaded) and calculate the number of records and columns
    Parameters
    ----------
    request
    Returns
    -------
    message with numbers of rows and columns
    """

    if request.method=='POST':
        uploaded_file=request.FILES['document']
        if uploaded_file.name.endswith('.csv'):
            name = FileSystemStorage().save(uploaded_file.name,uploaded_file)
            fileUploaded = 'media/'+name
            my_file = pd.read_csv(fileUploaded, sep=';', engine='python', encoding='ansi')
            data = pd.DataFrame(data=my_file, index=None)
            rows = len(data.axes[0])
            columns = len(data.axes[1])
            messages.warning(request, 'Le fichier a été téléchargé avec succès. Il contient ' + str(rows) + ' enregistrement(s) et ' + str(columns) + ' colonnes')
        else:
            messages.warning(request, 'Le fichier n\'a pas été téléchargé. Merci de choisir un fichier au format csv')
    return render(request, 'collect/telecharger_csv.html')

def suppr_questionnary (request):
    id_questionnary = request.GET.get('id_questionnary')
    query = "delete from questionnary where id_questionnary ="+id_questionnary
    sqlite_delete_query(query)
    return HttpResponse("ok")

def edit_questionnary(request, id_questionnary):
    context={}
    list_q =[]
    query = "select id_questionnary, content_questionnary from questionnary where id_questionnary="+str(id_questionnary)
    list_questionnary = sqlite_select_query(query)
    for questionnary in list_questionnary:
        y=json.loads(questionnary[1])
        print(y)
        intitule = y[0]['intitule']
        list_q.append((questionnary[0],intitule,y[0]['date'], y))
    context['list_questionnary'] = list_q
    return render(request,'quaero/new_questionnary.html', context)

def display_questionnary(request, id_questionnary):
    context={}
    list_q =[]
    query = "select id_questionnary, content_questionnary from questionnary where id_questionnary="+str(id_questionnary)
    list_questionnary = sqlite_select_query(query)
    for questionnary in list_questionnary:
        y=json.loads(questionnary[1])
        print(y)
        intitule = y[0]['intitule']
        list_q.append((questionnary[0],intitule,y[0]['date'], y))
    context['list_questionnary'] = list_q
    return render(request,'quaero/display_questionnary.html', context)