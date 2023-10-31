import psycopg2

db_params = {
        'database': 'explora',
        'user': 'postgres',
        'password': 'nBl030130!',
        'host': 'localhost',
        'port': '5432',
    }

def postgres_select_query(query):
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
        conn.close()
        return records
        #return cursor.lastrowid

    except psycopg2.Error as error:
        print("Failed to read data from postgres table", error)
    finally:
        if conn:
            conn.close()

def postgres_insert_query(query):
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        last_id = cursor.lastrowid
        cursor.close()
        return last_id

    except psycopg2.Error as error:
        print("Failed to write data in postgres table", error)
    finally:
        if conn:
            conn.close()

def postgres_update_query(query):
    db_params = {
        'database': 'explora',
        'user': 'postgres',
        'password': 'nBl030130!',
        'host': 'localhost',
        'port': '5432',
    }
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()
        print("Data updated in postgres table")
    except psycopg2.Error as error:
        print("Failed to update data in postgres table", error)
    finally:
        if conn:
            conn.close()

def postgres_delete_query(query):
    db_params = {
        'database': 'explora',
        'user': 'postgres',
        'password': 'nBl030130!',
        'host': 'localhost',
        'port': '5432',
    }
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()

    except psycopg2.Error as error:
        print("Failed to delete data in postgres table", error)
    finally:
        if conn:
            conn.close()