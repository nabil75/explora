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
from django.utils.translation import get_language, activate, gettext
from explora.connection.sqllite import sqlite_insert_query
from explora.services.auth import user_email_password_ok

from explora.services.quaero import email_exist


def index (request):
    return render(request, 'auth/index.html')

def validate_nouveau (request):
    email = request.GET.get('email')
    password = request.GET.get('password')
    response = email_exist(email)
    if(response>0):
        return HttpResponse(response)
    else:
        query = "insert into user (user_login, user_password) values ('"+email+"','"+password+"')"
        sqlite_insert_query(query)
        request.session['email'] = email
        return HttpResponse(response)
        
def validate_login_user (request):
    email = request.GET.get('email')
    password = request.GET.get('password')
    records = user_email_password_ok(email, password)
    if(records>0):
        request.session['email'] = email
        return HttpResponse(records)
    else:   
        return HttpResponse(records)