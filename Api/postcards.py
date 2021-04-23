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
        cursor.callproc('createPostcard', (data['image'], data['text'], 0))  
        result = cursor.fetchone()
        if(cursor.sp_outparams and result is not None):            
            return result[0]        
        else:
            raise 'Error'
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        raise "Something went wrong, try again please."

def get(conn, cursor, id):
    try:        
        cursor.callproc('getPostcard', (id,))
        result = cursor.fetchone()
        if(result):            
            return Postcard(result[0], result[1], result[2]).getView()
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        raise "Something went wrong, try again please."