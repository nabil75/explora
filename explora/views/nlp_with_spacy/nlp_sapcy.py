import codecs
import spacy
import PyPDF2
import os
from spacy.matcher import PhraseMatcher
from scipy import spatial
from spacy import displacy

# spacy english model (large)
nlp = spacy.load('fr_core_news_lg')

with codecs.open("media/my_text.txt","r", encoding='utf-8') as f:
    text = f.read()

doc = nlp(text)
# for sent in doc.sents:
#     print(sent)
#     print("-------------------------------------------------------------------------------------------------------------------------------------------------")

sentence1 = list(doc.sents)[20]
# print(sentence1)
token1 = sentence1[0]
# print(token1)
# print(token1.lang_)

# for ent in doc.ents:
#     print(ent.text,ent.label_)

# print(displacy.render(doc, style="ent"))

#open text file
text_file = open("media/text_ent.txt", "w", encoding="utf-8")
 
#write string to file
text_file.write(displacy.render(doc, style="ent"))
 
#close file
text_file.close()