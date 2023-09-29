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

def lineplot(request):
    context={}
    list_files = list_files_dir()
    context['list_files'] = list_files
    return render(request, 'visualize/visualize.html', context)
