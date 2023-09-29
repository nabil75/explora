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

from explora.services.collect import list_files_dir

def display_clean(request):
    context={}
    list_files = list_files_dir()
    context['list_files'] = list_files
    return render(request, 'clean/clean.html', context)

def delete_column(request):
    file = request.GET.get('file')
    colonne = request.GET.get('colonne')
    filename = 'media/' + file
    csv_file = pd.read_csv(filename, sep=';', engine='python', encoding='ansi')
    csv_file.pop(colonne)
    os.remove(filename)
    csv_file.to_csv(filename, sep=';', encoding='ansi', index=False)
    colonnes = []
    for col_name in csv_file.columns:
        colonnes.append(col_name)
    return HttpResponse(str(colonnes))