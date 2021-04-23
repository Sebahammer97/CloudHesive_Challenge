import mariadb

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

def create(conn, cursor, data):
    try:
        #cursor.callproc('createPostcard', (data['image'], data['text'], 0))  
        cursor.execute('INSERT INTO postcards (image, text) VALUES(?,?)', (data['image'], data['text']))           
        if (cursor.lastrowid is not None):                     
            conn.commit()              
            return cursor.lastrowid
        else:
            raise 'Error'
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        raise "Something went wrong, try again please."

def get(conn, cursor, id):
    try:
        cursor.execute('SELECT id, image, text FROM postcards WHERE state = 1 AND id = ?', (id,))
        result = cursor.fetchone()
        if(result):            
            return Postcard(result[0], result[1], result[2]).getView()
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        raise "Something went wrong, try again please."