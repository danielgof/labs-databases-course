from flask import Flask, request, jsonify
from flask_cors import CORS

from db import *

session = Session()
app = Flask(__name__)
CORS(app)


@app.route("/api/v1/get_all_people_data", methods=["GET"])
def get_all_data():    
    data = session.query(People).all()
    res = list()
    for person in data:
        phone_num = session.query(Phone).filter(Phone.person_id == person.id).first()
        position = session.query(Positon).filter(Positon.id == person.position_id).first()
        if position == None:
            continue
        if phone_num == None:
            continue
        res.append({
        "position": position.position,
        "last_name": person.last_name,
        "first_name": person.first_name,
        "salary": position.salary,
        "department": position.departament,
        "phone": phone_num.phone
        })
    return res 


@app.route("/api/v1/add_person", methods=["POST"])
def add_person():
    data = request.get_json(force=True)
    print(data)
    position = Positon(
        data["departament"],
        data["salary"],
        data["position"]
    )
    session.add(position)
    session.commit()
    data1 = session.query(Positon) \
    .filter(Positon.position == data["position"]).first()
    person = People(
        data["lastname"], 
        data["firstname"],
        data1.id
    )
    session.add(person)
    session.commit()
    data2 = session.query(People)\
    .filter(People.first_name == data["firstname"]).first()
    phone = Phone(
        data2.id,
        data["phonenumber"]
    )
    session.add(phone)
    session.commit()
    return jsonify({"result": "succes"})


@app.route("/api/v1/delete_person", methods=["DELETE"])
def delete_person():
    data = request.get_json(force=True)
    phone = session.query(Phone).filter(Phone.phone == data["phonenumber"]).first()
    person_id = phone.person_id
    session.query(Phone).filter(Phone.phone == data["phonenumber"]).delete()
    session.commit()
    session.query(People).filter(People.id == person_id).delete()
    session.commit()
    return jsonify({"result":"success"})


@app.route("/api/v1/upd_phone", methods=["PUT"])
def upd_phone():
    data = request.get_json(force=True)
    phone = session.query(Phone)\
    .filter(Phone.phone == data["phonenumber_old"])\
    .update({Phone.phone: data["phonenumber_new"]}, synchronize_session = False)
    print(phone)
    session.commit()
    return jsonify({"result":"success"})


@app.route("/api/v1/upd_firstname", methods=["PUT"])
def upd_firstname():
    data = request.get_json(force=True)
    phone = session.query(Phone)\
    .filter(Phone.phone == data["phonenumber"]).first()
    personid = phone.person_id
    person = session.query(People)\
    .filter(People.id == personid)\
    .update({People.first_name: data["firstname_new"]}, synchronize_session = False)
    session.commit()
    return jsonify({"result":"success"})


@app.route("/api/v1/upd_position", methods=["PUT"])
def upd_position():
    data = request.get_json(force=True)
    phone = session.query(Phone)\
    .filter(Phone.phone == data["phonenumber"]).first()
    personid = phone.person_id
    person = session.query(People)\
    .filter(People.id == personid)\
    .update({People.position_id: data["position_new"]}, synchronize_session = False)
    session.commit()
    return jsonify({"result":"success"})

if __name__ == "__main__":
    app.run()

