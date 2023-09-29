import io

import matplotlib.pyplot as plt
import seaborn as sns
import base64
import os
import json
import pandas as pd
import PyPDF2

#Récupérer la liste des mots clé contenus dans la variable 'product_name'
def recup_mots_cle(filename):
    csv_clean_file = pd.read_csv(filename, sep=';', engine='python', encoding='utf-8')
    mots_cle =[]
    for index, row in csv_clean_file.iterrows():
        name = row['product_name']
        if(isinstance(name,str)):
            elem_name = name.split()
            for mot in elem_name:
                if(len(mot)>2):
                    mots_cle.append(mot)

    #supprimer les doublons dans la liste des mots clé
    mots_cle = list(set(mots_cle))
    return mots_cle
