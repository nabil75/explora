

import email
from http.client import HTTPResponse
import sqlite3

def email_exist(email):
    try:
        sqliteConnection = sqlite3.connect('db.sqlite3')
        cursor = sqliteConnection.cursor()
        query = "SELECT * from user where user_login = '"+email+"'"
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
        return len(records)

    except sqlite3.Error as error:
        print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

def liste_destinataire():
    try:
        sqliteConnection = sqlite3.connect('db.sqlite3')
        cursor = sqliteConnection.cursor()
        query = "SELECT * from liste_destinataire"
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
        return records

    except sqlite3.Error as error:
        print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()