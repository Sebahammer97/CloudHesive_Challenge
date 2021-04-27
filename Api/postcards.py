#== Libraries =================================================================
import sys
import mariadb

#== Global Variables =================================================================
conn = {}
cursor = {}

# Instantiate Connection to the DB
def initConnDB():
    global conn, cursor
    try:
        conn = mariadb.connect(
            user="user",
            password="passwd",
            host="localhost",
            port=3306,
            database="postcards",
            autocommit = True)
            
        # Instantiate Cursor
        cursor = conn.cursor()
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)

def closeConnDB():
    global conn, cursor
    cursor.close()
    conn.close()


class Postcard:
    def __init__(self, id, image, text):
        self.id = id
        self.image = image
        self.text = text
    
    def getView(self):
        view = {
            "id": self.id,
            "image": self.image,
            "text": self.text
        }
        return view

def create(data):
    try:
        initConnDB()
        cursor.callproc('createPostcard', (data['image'], data['text'], 0))  
        result = cursor.fetchone()
        if(cursor.sp_outparams and result is not None): 
            closeConnDB()           
            return result[0]        
        else:
            raise 'Error'
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        closeConnDB()
        raise "Something went wrong, try again please."

def get(id):
    try:      
        initConnDB()  
        cursor.callproc('getPostcard', (id,))
        result = cursor.fetchone()
        if(result is not None):         
            closeConnDB()   
            return Postcard(result[0], result[1], result[2]).getView()
        else:
            raise 'Error'
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        closeConnDB()
        raise "Something went wrong, try again please."