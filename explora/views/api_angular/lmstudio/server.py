import os
from django.http import JsonResponse
import openai

def get_lmstudio_response(request):
  openai.api_base = "http://localhost:7000/v1" # point to the local server
  openai.api_key = "" # no need for an API key
  system_content = "Tu réalise une étude de marché sur les pratiques sportives. Pour cela tu dois interroger un échantillon de personnes."
  user_content = "Je voudrais que tu me génère une seule question sur la fréquence avec laquelle une personne fait du sport. Je voudrais que le répondant puisse choisir parmi une série de réponses possibles."
  few_shot =""
  completion = openai.ChatCompletion.create(
    model="local-model", # this field is currently unused
    messages=[
      {"role": "system", "content": system_content},
      {"role": "user", "content": user_content}
    ],
    temperature=0.4
  )

  response = completion.choices[0].message
  return JsonResponse (response)