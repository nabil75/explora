import io

import matplotlib.pyplot as plt
import seaborn as sns
import base64
import os
import json
import pandas as pd
import PyPDF2

from explora.connection.sqllite import sqlite_select_query

def user_email_password_ok(email, password):
    query = "select * from user where user_login ='"+email+"' and user_password='"+password+"'"
    records = sqlite_select_query(query)
    return len(records)