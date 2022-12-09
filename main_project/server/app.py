from flask import Flask, request, jsonify, abort, Response
from flask_cors import CORS
import redis
import logging
import os
from datetime import datetime

from utils import *
from db import *

session = Session()
app = Flask(__name__)
CORS(app)
cache = redis.Redis(host='127.0.0.1', port=6379)

if not os.path.isdir("./log"):
    os.mkdir("./log")
logging.basicConfig(filename=f'./log/{datetime.today().strftime("%Y-%m-%d")}.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')


@app.route("/api/v1/num_visits", methods=["GET"])
def num_visits():
    count = get_hit_counts()
    app.logger.info(f"Number of visitors of portal at {datetime.today().strftime('%Y-%m-%d')} is {count}")
    return jsonify({"visited": count})


@app.route("/api/v1/get_all_people_data", methods=["GET"])
def get_all_data():    
    try:
        data = session.query(Person).all()
        res = list()
        for person in data:
            phone_num = session.query(Phone) \
            .join(Phone, Person.phones) \
            .filter(Person.id == 1) \
            .first()
            position = session.query(Positon).filter(Positon.id == person.position_id).first()
            if position == None:
                continue
            if phone_num == None:
                continue
            res.append({
            "id": person.id,
            "position": position.position,
            "last_name": person.last_name,
            "first_name": person.first_name,
            "salary": position.salary,
            "department": position.departament,
            "phone": phone_num.phone
            })
        app.logger.info("All users were selected from database")
        return res 
    except Exception as e:
        app.logger.warning(f"Exeption {e} ocured")
        abort(Response(e, 500))


@app.route("/api/v1/add_person", methods=["POST"])
def add_person():
    data = request.get_json(force=True)
    new_person = Person(
        data["lastname"],
        data["firstname"],
        data["position_id"]
    )
    new_phone = Phone(
        data["phonenumber"]
    )
    new_person.phones = [new_phone]
    session.add(new_person)
    session.add(new_phone)
    session.commit()
    session.close()
    return jsonify({"result": "succes"})


@app.route("/api/v1/delete_person", methods=["DELETE"])
def delete_person():
    data = request.get_json(force=True)
    session.query(Person).filter(Person.id == data["id"]).delete()
    session.commit()

    # phones = session.query(Phone) \
    # .join(Phone, Person.phones) \
    # .filter(Person.id == 15) \
    # .all()
    # print(phones)
    # for phone in phones:
    #     session.delete(phone)
    # session.commit()

    # phone = session.query(Phone).filter(Phone.phone == data["phonenumber"]).first()
    # person_id = phone.person_id
    # session.query(Phone).filter(Phone.phone == data["phonenumber"]).delete()
    # session.commit()
    # session.query(Person).filter(Person.id == person_id).delete()
    # session.commit()
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
    person = session.query(Person)\
    .filter(Person.id == personid)\
    .update({Person.first_name: data["firstname_new"]}, synchronize_session = False)
    session.commit()
    return jsonify({"result":"success"})


@app.route("/api/v1/upd_position", methods=["PUT"])
def upd_position():
    data = request.get_json(force=True)
    phone = session.query(Phone)\
    .filter(Phone.phone == data["phonenumber"]).first()
    personid = phone.person_id
    person = session.query(Person)\
    .filter(Person.id == personid)\
    .update({Person.position_id: data["position_new"]}, synchronize_session = False)
    session.commit()
    return jsonify({"result":"success"})


@app.route("/api/v1/add_position", methods=["POST"])
def add_position():
    data = request.get_json(force=True)
    position = Positon(
        data["departament"],
        data["salary"],
        data["position"]
    )
    session.add(position)
    session.commit()
    return jsonify({"result": "success"})


@app.route("/api/v1/positions_info", methods=["GET"])
def positions_info():
    try:
        data = session.query(Positon).all()
        res = list()
        for position in data:
            res.append({
            "position": position.position,
            "salary": position.salary,
            "department": position.departament
            })
        app.logger.info("All users were selected from database")
        return res 
    except Exception as e:
        app.logger.warning(f"Exeption {e} ocured")
        abort(Response(e, 500))


if __name__ == "__main__":
    app.run()

