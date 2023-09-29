from elasticsearch import Elasticsearch
import os
import glob
import PyPDF2
import pandas as pd

os.chdir("C:/Users/nabil/OneDrive/Documents/BDF/Documentation/methodologie/test")
files = glob.glob("*.*")
nb_files = len(files)

# for book in files:
#     print(book)

def extractPdfFiles(files):
    this_loc=1
    df=pd.DataFrame(columns=("name","content"))

    for file in files:
        pdfFileObj = open(file, 'rb')
        pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
        n_pages=pdfReader.numPages
        this_doc=''
        for i in range(n_pages):
            pageObj = pdfReader.getPage(i)
            this_text = pageObj.extractText()
            this_doc+= this_text
        df.loc[this_loc]=file, this_doc
        this_loc = this_loc + 1
    return df

df = extractPdfFiles(files)
filename = "C:/Users/nabil/OneDrive/Documents/Travail/django_projects/explora/media/pdf_files.csv"
df.to_string(filename)

# es = Elasticsearch()

# col_names = df.columns
# for row_number in range(df.shape[0]):
#     body = dict([(name,str(df.iloc[row_number][name])) for name in col_names])
#     es.index(index='ficot',doc_type = 'books', body = body)

# search_results = es.search(index = 'entreprise', doc_type ='books', 
#                            body = {"_source":"name",
#                                    'query':{
#                                         'match_phrase':{"content":"consolidé"}
#                                     }
#                             })

# print(search_results)