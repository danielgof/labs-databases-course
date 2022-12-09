from sqlalchemy import Column, ForeignKey, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql://postgres:1111@localhost:5432/postgres')
Session = sessionmaker(bind=engine)
print("session created succesfully")

"""Create a base class"""
Base = declarative_base()
"""Tables"""
"""1.Positons"""
class Positon(Base):
    __tablename__ = "position"
    id = Column(Integer, primary_key=True)
    departament = Column(String, nullable=False)
    salary = Column(String, nullable=False)
    position = Column(String, nullable=False)

    def __init__(self, departament, salary, position):
        self.departament = departament
        self.salary = salary
        self.position = position

"""2.People"""
class People(Base):
    __tablename__ = "people"
    id = Column(Integer, primary_key=True)
    last_name = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    position_id = Column(Integer, ForeignKey("position.id"))

    def __init__(self, last_name, first_name, position_id):
        self.last_name = last_name
        self.first_name = first_name
        self.position_id = position_id

"""3.Phones"""
class Phone(Base):
    __tablename__ = "phone"
    id = Column(Integer, primary_key=True)
    person_id = Column(Integer, ForeignKey("people.id"))
    phone = Column(String, nullable=False, index=True, unique=True)

    def __init__(self, person_id, phone):
        self.person_id = person_id
        self.phone = phone

Base.metadata.create_all(engine)

CEO = Positon("all", "1000000", "CEO") 
CTO = Positon("all", "650000", "CTO")
SE = Positon("Cloud storage", "250000", "SE")
CAE = Positon("Audit", "350000", "CAE")
Auditor = Positon("Audit", "150000", "Auditor")
CAIO = Positon("Artificial Intelligence", "400000", "CAIO")
DS = Positon("Artificial Intelligence", "200000", "DS")


Richard = People("Handrix", "Richard", 1)
Jared = People("Dunn", "Jared", 2)
Dinesh = People("Chuktai", "Dinesh", 3)
Gilfoyel = People("Burtram", "Gilfoyel", 3)
Neil = People("Thompson", "Neil", 4)
Jose = People("Chavez", "Jose", 5)
Hector = People("Woods", "Hector", 5)
William = People("Neal", "William", 6)
Ralph = People("Clark", "Ralph", 7)
Eugene = People("Powell", "Eugene", 7)
Leon = People("Martinez", "Leon", 3)
Carl = People("Wallace", "Carl", 5)

Richard_phone = Phone(1, "+13459875667")
Jared_phone = Phone(2, "+13454568976")
Dinesh_phone = Phone(3, "+17652346787")
Gilfoyel_phone = Phone(4, "+19875675465")
Neil_phone = Phone(5, "+19349875667")
Jose_phone = Phone(6, "+11357468976")
Hector_phone = Phone(7, "+17652376487")
William_phone = Phone(8, "+19898775465")
Ralph_phone = Phone(9, "+13454568064")
Eugene_phone = Phone(10, "+14552348787")
Leon_phone = Phone(11, "+19887775465")
Carl_phone = Phone(12, "+13459983467")
# Richard_phone = Phone(1, "+154********")
# Jared_phone = Phone(2, "+167********")
# Dinesh_phone = Phone(3, "+1393*******")
# Gilfoyel_phone = Phone(4, "+1*234*******")

# session = Session()
# session.add(CEO)
# session.add(CTO)
# session.add(SE)

# session.commit()
# session.close()

session = Session()
session.add(CEO)
session.add(CTO)
session.add(SE)
session.add(CAE)
session.add(Auditor)
session.add(CAIO)
session.add(DS)

<<<<<<< HEAD
session.commit()
session.close()
=======
# session.commit()
# session.close()

# session.add(Richard_phone )
# session.add(Jared_phone )
# session.add(Dinesh_phone )
# session.add(Gilfoyel_phone )
>>>>>>> c67c0590985b7b6ba27c3c10d39e8ea2a65634e0

session.add(Richard)
session.add(Jared)
session.add(Dinesh)
session.add(Gilfoyel)
session.add(Neil)
session.add(Jose)
session.add(Hector)
session.add(William)
session.add(Ralph)
session.add(Eugene)
session.add(Leon)
session.add(Carl)

session.commit()
session.close()

session.add(Richard_phone )
session.add(Jared_phone )
session.add(Dinesh_phone )
session.add(Gilfoyel_phone )
session.add(Neil_phone)
session.add(Jose_phone)
session.add(Hector_phone)
session.add(William_phone)
session.add(Ralph_phone)
session.add(Eugene_phone)
session.add(Leon_phone)
session.add(Carl_phone)

session.commit()
session.close()