from flask import current_app, g
from pymongo import MongoClient

# https://www.w3schools.com/python/python_mongodb_getstarted.asp

def get_db():
    if 'db' not in g:
        client = MongoClient('mongo_db:27017',
                            username=current_app.config['MONGO_USER'],
                            password=current_app.config['MONGO_PW'],
                            authSource='admin',
                            authMechanism='SCRAM-SHA-256')
        g.db = client["watch"]
    return g.db