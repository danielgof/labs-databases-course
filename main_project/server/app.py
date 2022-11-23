from flask import Flask, request, jsonify
from flask_cors import CORS

from db import *

session = Session()

app = Flask(__name__)
CORS(app)


@app.route("/get_all_people_data", methods=["GET"])
def get_all_data():    
    data = session.query(People).all()
    res = list()
    for person in data:
        res.append({
        "last_name": person.last_name,
        "first_name": person.first_name,
        "position_id": person.position_id
        })
    return res
    # return jsonify({"result": res})

@app.route("/get_all_phone_num", methods=["GET"])
def all_phones():
    data = session.query(Phone).all()
    res = list()
    for number in data:
        res.append({
        "person_id": number.person_id,
        "phone": number.phone
        })
    return res

@app.route("/get_all_positions", methods=["GET"])
def all_positions():
    data = session.query(Positon).all()
    res = list()
    for position in data:
        res.append({
        "department": position.departament,
        "salary": position.salary,
        "position": position.position
        })

    return res

@app.route("/api/phone_num", methods=["GET", "POST"])
def show_phone_num():
    input_json = request.get_json(force=True)
    data = session.query(Phone).filter(Phone.person_id == input_json["person_id"]).first()
    print(data.phone)
    return jsonify({"phone_number": data.phone})

@app.route("/api/add_person", methods=["POST"])
def add_person():
    data = request.get_json(force=True)
    person = People(data["last_name"], data["first_name"], 3)
    session.add(person)
    session.commit()
    return jsonify({"result": "succes"})

@app.route("/api/delete_by_id", methods=["DELETE"])
def delete_person():
    data = request.get_json(force=True)
    session.query(People).filter(People.id == data["id"]).delete()
    session.commit()
    return jsonify({"result":"success"})

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