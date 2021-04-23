#== Libraries =================================================================
from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
from flask_cors import CORS

import sys
import mariadb

from postcards import create, get

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
            database="postcards")
            
        # Instantiate Cursor
        cursor = conn.cursor()
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)

def closeConnDB():
    global conn, cursor
    cursor.close()
    conn.close()

# Instantiate Flask Server
try:
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
except Flask.errorhandler as e:
    print(f"Error to initialize Flask server: {e}")
    sys.exit(1)

#== Classes ===========================================================================
class Postcards(Resource):
    def post(self):        
        try:
            initConnDB()
            data = request.json['data']
            if(data is not None):
                response = create(conn, cursor, data)
                closeConnDB()        
                data = {'message': response, 'code': 'SUCCESS'}        
                return make_response(jsonify(data), 200)
            else:
                raise 'Error'
        except:
            data = {'message': 'Error', 'code': 'ERROR'}
            return make_response(jsonify(data), 404)
    def get(self):
        try:
            initConnDB()
            id = request.args.get('id')
            if(id is not None):
                response = get(conn, cursor, id)
                closeConnDB()        
                data = {'message': response, 'code': 'SUCCESS'}        
                return make_response(jsonify(data), 200)
        except:
            data = {'message': 'Error', 'code': 'ERROR'}
            return make_response(jsonify(data), 404)

#== Routes ============================================================================
# Auth
api.add_resource(Postcards, '/postcards')

#== Initialize ==========================================================================
if __name__ == '__main__':
    app.run(host= '0.0.0.0', port='5000', threaded=True)   