from django.http import HttpResponse
from django.shortcuts import render
import openai
import os
from PyPDF2 import PdfReader

openai.api_key = "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"


def chat(request):
    return render(request,'zdivers/chat.html')


def generate_response(request):
    query = request.GET.get('query')
    text = extractPDF()
    # response = openai.Completion.create(

    # model="text-davinci-003",
    # prompt = "je veux être un grand trader. un grand trader je veux être",
    # temperature=0.7,
    # max_tokens=300,
    # top_p=1.0,
    # frequency_penalty=0.0,
    # presence_penalty=0.0        

    # model="text-davinci-003",
    # prompt=query+"\nAI:",
    # temperature=0.9,
    # max_tokens=300,
    # top_p=1,
    # frequency_penalty=0.0,
    # presence_penalty=0.6,
    # stop=[" Human:", " AI:"]

    
    # engine="text-davinci-003",  # le modèle ChatGPT à utiliser
    # prompt=query,  # le texte à envoyer au modèle
    # max_tokens=500,  # le nombre maximum de jetons à générer dans la réponse
    # n=1,  # le nombre de réponses à générer
    # stop=None,  # le texte qui arrête la génération de texte
    # temperature=0.9,  # la température pour contrôler la diversité du texte généré

    # )

    # output = response.choices[0].text
    # print(output)
    return HttpResponse(text)

def extractPDF():
    # creating a pdf reader object
    reader = PdfReader("C:/Users/nabil/OneDrive/Documents/BDF/Documentation/methodologie/3110-01.pdf")
    text=""
    # printing number of pages in pdf file
    nbPages = len(reader.pages)
    print(nbPages)
    # getting a specific page from the pdf file
    for i in range(nbPages):
        page = reader.pages[i]
        # extracting text from page
        text = text+"\n"+page.extract_text()
    print(text)
    return (text)
