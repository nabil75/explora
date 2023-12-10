import datetime
import requests
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
from pandas import json_normalize
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from explora.connection.postgres import postgres_delete_query, postgres_insert_query, postgres_select_query, postgres_update_query


def get_results_fermee (request, id_questionnary, id_question):

        # Create the plot
    x = np.linspace(0, 10, 100)
    y = np.sin(x)

    plt.plot(x, y)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Sine Wave')
    plt.savefig('media/images/png1.svg')

    result=[]
    data=[]
    valeurs=[]
    query = "SELECT * from results where id_questionnary ='"+str(id_questionnary)+"'"
    records = postgres_select_query(query)
    #Récupérer les libellés des modalités
    content = json.loads(records[0][1])
    reps =content[0]['questions'][int(id_question)]['modalites']
    for rep in reps:
        valeurs.append(rep['libelle'])
        list_labels = json.loads(json.dumps(valeurs))
    #Comptage du nombre de valeurs 'true' pour chaque modalité
    val_tot=[]
    for record in records:
        content = json.loads(record[1])
        reponses =content[0]['questions'][int(id_question)]['modalites']
        val=[]
        for reponse in reponses:
            if (reponse['isChecked'] == True):
                val.append(1)
            else:
                val.append(0)
        val_tot.append(val)

    # for i in range(len(list_labels)):
    #     # result.append({"label":list_labels[i], "value":data[i]})
    #     print(list_labels[i])
    #     print(data[i])
    # return JsonResponse(result)
    
    data=sumReponseTrue(val_tot)
    return JsonResponse({"labels":list_labels, "values":data})

def sumReponseTrue(val_tot):
    val_result_tot =[0]*len(val_tot[0])
    for val in val_tot:
        for i in range(len(val)):
            val_result_tot[i] += val[i]
    return val_result_tot

