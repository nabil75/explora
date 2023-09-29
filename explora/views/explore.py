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
from explora.services.clean import extract_pdf_file
from explora.services.collect import list_files_dir
from explora.services.explore import recup_mots_cle

def display_explore(request):
    """
    1- display explorer page
    :param request:
    :return:
    """
    context={}
    list_files = list_files_dir()
    context['list_files'] = list_files
    return render(request, 'explore/explore.html', context)
    
def get_list_mots_cle(request):
    """
    1- get list of key words from product_name column
    Parameters:
    chosen file
    ----------
    request
    Returns
    key words list
    -------
    message with numbers of rows and columns
    """
    filename = 'media/'+request.GET.get('file')
    list_mots_cle = recup_mots_cle(filename)
    return HttpResponse(str(list_mots_cle))

def get_list_product(request):
    produit = request.GET.get('produit')
    filename = 'media/'+request.GET.get('file')
    csv_clean_file = pd.read_csv(filename, sep=';', engine='python')
    produits = []
    for index, row in csv_clean_file.iterrows():
        name = str(row['product_name'])
        if produit in name:
            produits.append(name)
    return HttpResponse(str(produits))

def get_info_product(request):
    """
    Retourner les données relatives au produit choisi, aux produits à score nutritionnel équivalent et à l'ensemble des produits
    1- convertir le fichier CSV en dataframe
    2- supprimer les éléments nutritifs non concernés par le produit choisi
    3- supprimer la dimension count de la fonction describe
    :param request:
    :return: table des valeurs par élément nutritif
    """
    produit = request.GET.get('produit')
    filename = 'media/'+request.GET.get('file')
    csv_file = pd.read_csv(filename, sep=';', decimal='.', engine='python')
    csv_product = csv_file[csv_file.product_name == produit]
    csv_clean_file1 = csv_product.drop(columns=['product_name'])
    csv_clean_file2 = csv_clean_file1.dropna(axis=1, how='all')
    csv_clean_file3 = csv_clean_file2.transpose()
    csv_clean_file4 = csv_clean_file3.rename(columns={csv_clean_file3.columns[0]: 'valeur nutritive'})
    print( "csv_clean_file4")
    print(csv_clean_file4)
    csv_clean_file5 = csv_clean_file4.round(decimals=4)
    val = csv_clean_file5.loc['nutrition-score-fr_100g']['valeur nutritive']
    csv_clean_file6 = csv_clean_file5.style.set_properties(**{'text-align': 'right'})

    elements_nutritifs=[]
    p=0
    for i in csv_clean_file6.index:
        elements_nutritifs.append(csv_clean_file6.index[p])
        p+=1

    csv_categorie = csv_file.loc[(csv_file['nutrition-score-fr_100g'] == val)]
    csv_clean_file7 = csv_categorie.drop(columns=['product_name'])
    csv_clean_file8 = csv_clean_file7.dropna(axis=1, how='all')
    csv_clean_file8 = csv_clean_file8.filter(elements_nutritifs, axis=1)
    csv_clean_file9 = csv_clean_file8.describe().transpose()
    csv_clean_file10 = csv_clean_file9.rename(columns={csv_clean_file9.columns[1]: 'valeur nutritive'})
    csv_clean_file11 = csv_clean_file10.filter(['valeur nutritive'], axis=1)
    csv_clean_file12 = csv_clean_file11.style.set_properties(**{'text-align': 'right'})

    csv_clean_file13 = csv_file.drop(columns=['product_name'])
    csv_clean_file14 = csv_clean_file13.dropna(axis=1, how='all')
    csv_clean_file14 = csv_clean_file14.filter(elements_nutritifs, axis=1)
    csv_clean_file15 = csv_clean_file14.describe().transpose()
    csv_clean_file16 = csv_clean_file15.rename(columns={csv_clean_file9.columns[1]: 'valeur nutritive'})
    csv_clean_file17 = csv_clean_file16.filter(['valeur nutritive'], axis=1)
    csv_clean_file18 = csv_clean_file17.style.set_properties(**{'text-align': 'right'})

    reponses={}
    reponses['produit'] = csv_clean_file6.to_html()
    reponses['categorie'] = csv_clean_file12.to_html()
    reponses['tous'] = csv_clean_file18.to_html()
    return JsonResponse(reponses)



def get_list_colonnes(request):
    file = request.GET.get('file')
    filename = 'media/'+file
    csv_file = pd.read_csv(filename, sep=';', engine='python', encoding='ansi')
    #df=csv_file.select_dtypes(include='number')
    colonnes = []
    for col_name in csv_file.columns:
        colonnes.append(col_name)
    return HttpResponse(str(colonnes))

def get_overview(request):
    context = {}
    file = request.GET.get('file')
    colonne = request.GET.get('colonne')
    filename = 'media/' + file
    csv_file = pd.read_csv(filename, sep=';', engine='python', encoding='ansi')
    df = pd.DataFrame({'valeur': csv_file[colonne]})

    profile = ProfileReport(df, title=colonne, html={'style': {'full_width': True}})
    rapport = profile.to_html()
    context['overview']=rapport
    return JsonResponse(context)

def index_document(request):
    os.chdir("C:/Users/nabil/OneDrive/Documents/Documentations/AI/Articles")
    files = glob.glob("*.pdf")
    nb_files = len(files)
    print("Nombre de fichiers : "+str(nb_files))
    context={}
    books=[]
    for book in files:
        books.append(book)
    context['books']=books
    df = extract_pdf_file(books)
    es = Elasticsearch("http://localhost:9200")
    col_names = df.columns
    for row_number in range(df.shape[0]):
        body = dict([(name, str(df.iloc[row_number][name])) for name in col_names])
        es.index(index='intelligence', doc_type ='books', body=body)

    df_json = df.to_json  
    context['df']= df_json
    return render(request, 'explore/index_document.html', context)