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


def display_collect(request):
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
    return render(request, 'collect/collect.html')

def telecharger_csv(request):
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

def telecharger_pdf(request):
    """
    1- upload working file (pdf only)
    2- storage of the file in the media directory
    Parameters
    ----------
    request
    Returns
    -------
    message with numbers of rows and columns
    """
    if request.method=='POST':
        uploaded_file=request.FILES['document']
        if uploaded_file.name.endswith('.pdf'):
            name = FileSystemStorage().save(uploaded_file.name,uploaded_file)
            messages.warning(request, 'Le fichier a été téléchargé avec succès.')
        else:
            messages.warning(request, 'Le fichier n\'a pas été téléchargé. Merci de choisir un fichier au format pdf')
    return render(request, 'collect/telecharger_pdf.html')

def telecharger_fichier_json(request):
    fichier_json = {
        "fruits": [
        { "kiwis": 3,
            "mangues": 4,
            "pommes": 2
        },
        ],
        "legumes":
        { "patates": "amandine",
            "figues": "de barbarie"
        }
        }
    context={'fichier':fichier_json}
    return render(request, 'collect/telecharger_fichier_json.html', context)

