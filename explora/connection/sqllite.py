import sqlite3

def sqlite_select_query(query):
    try:
        sqliteConnection = sqlite3.connect('db.sqlite3')
        cursor = sqliteConnection.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
        return records
        #return cursor.lastrowid

    except sqlite3.Error as error:
        print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

def sqlite_insert_query(query):
    try:
        sqliteConnection = sqlite3.connect('db.sqlite3')
        cursor = sqliteConnection.cursor()
        cursor.execute(query)
        sqliteConnection.commit()
        last_id = cursor.lastrowid
        cursor.close()
        return last_id

    except sqlite3.Error as error:
        print("Failed to write data in sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

def sqlite_update_query(query):
    try:
        sqliteConnection = sqlite3.connect('db.sqlite3')
        cursor = sqliteConnection.cursor()
        cursor.execute(query)
        sqliteConnection.commit()
        cursor.close()
        print("Data updated in sqlite table")
    except sqlite3.Error as error:
        print("Failed to update data in sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

def sqlite_delete_query(query):
    try:
        sqliteConnection = sqlite3.connect('db.sqlite3')
        cursor = sqliteConnection.cursor()
        cursor.execute(query)
        sqliteConnection.commit()
        cursor.close()

    except sqlite3.Error as error:
        print("Failed to delete data in sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()