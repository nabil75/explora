import io

import matplotlib.pyplot as plt
import seaborn as sns
import base64
import os
import json
import pandas as pd
import PyPDF2

def get_graph():
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph

def get_plot(x, nom_colonne):
    plt.switch_backend('AGG')
    plt.figure(figsize=(10,3))
    plt.title(nom_colonne)
    #plt.plot(x)
    plt.hist(x, bins=100)
    plt.gca().set(title=nom_colonne, ylabel='Frequency');
    plt.xticks(rotation=45)
    # plt.xlabel('axe_absisses')
    plt.tight_layout()
    graph = get_graph()
    return graph