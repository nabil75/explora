import io

import matplotlib.pyplot as plt
import seaborn as sns
import base64
import os
import json
import pandas as pd
import PyPDF2

def list_files_dir():
    path = 'media/'
    list_files=[]
    files = os.listdir(path)
    for f in files:
        if f.endswith('.csv'):
            list_files.append(f)
    return list_files

def convert_json_to_csv(filename):
    # Récupération des données du fichier JSON et création du dataframe correspondant
    my_json_file = pd.read_json('media/'+filename)
    data = pd.DataFrame(data=my_json_file, index=None)
    # conversion des données dans un fichier CSV
    data.to_csv('media/'+filename, index= False, sep=';', encoding ='ansi')