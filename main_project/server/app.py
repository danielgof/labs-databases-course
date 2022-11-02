from flask import Flask, request
from flask_cors import CORS
from db import *

db = Database

app = Flask(__name__)
CORS(app)


@app.route("/get_all_people_data", methods=["GET"])
def get_all_data():    
    connection = db.connect()
    return db.all_persons_data(connection)


@app.route("/phone_num", methods=["GET", "POST"])
def show_phone_num():
    input_json = request.get_json(force=True)
    connection = db.connect()
    return Database.get_number(connection, input_json.get("id"))


# @app.route("delete_person", methods=["DELETE"])
# def delete_person():
#     pass


# @app.route("add_num", methods=["POST"])
# def add_new_number():
#     pass


# @app.route()
# def del_number():
    pass


if __name__ == "__main__":
    app.run()