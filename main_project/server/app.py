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
    # return jsonify({"result": res})



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


if __name__ == "__main__":
    app.run()




# @app.route("/get_all_phone_num", methods=["GET"])
# def all_phones():
#     data = session.query(Phone).all()
#     res = list()
#     for number in data:
#         res.append({
#         "person_id": number.person_id,
#         "phone": number.phone
#         })
#     return res

# @app.route("/get_all_positions", methods=["GET"])
# def all_positions():
#     data = session.query(Positon).all()
#     res = list()
#     for position in data:
#         res.append({
#         "department": position.departament,
#         "salary": position.salary,
#         "position": position.position
#         })

#     return res


# @app.route("/api/v1/phone_num", methods=["GET", "POST"])
# def show_phone_num():
#     input_json = request.get_json(force=True)
#     data = session.query(Phone).filter(Phone.person_id == input_json["person_id"]).first()
#     print(data.phone)
#     return jsonify({"phone_number": data.phone})