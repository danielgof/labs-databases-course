from sqlalchemy import Column, ForeignKey, String, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql://postgres:admin@localhost:5432/lab')
Session = sessionmaker(bind=engine)
print("session created succesfully")

"""Create a base class"""
Base = declarative_base()
"""Tables"""
"""1.Positons"""
class Positon(Base):
    __tablename__ = "position"
    id = Column(Integer, primary_key=True)
    departament = Column(String)
    salary = Column(String)
    position = Column(String)

    def __init__(self, department, salary, position):
        self.department = department
        self.salary = salary
        self.position = position

"""2.People"""
class People(Base):
    __tablename__ = "people"
    id = Column(Integer, primary_key=True)
    last_name = Column(String)
    first_name = Column(String)
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
    phone = Column(String)

    def __init__(self, person_id, phone):
        self.person_id = person_id
        self.phone = phone

Base.metadata.create_all(engine)

# CEO = Positon("-", "1000000", "CEO")
# CTO = Positon("-", "600000", "CTO")
# SE = Positon("cloud media", "200000", "SE")

Richard = People("Handrix", "Richard", 1)
Jared = People("Dunn", "Jared", 2)
Dinesh = People("Chuktai", "Dinesh", 3)
Gilfoyel = People("Burtram", "Gilfoyel", 3)

session = Session()
# session.add(CEO)
# session.add(CTO)
# session.add(SE)

session.add(Richard)
session.add(Jared)
session.add(Dinesh)
session.add(Gilfoyel)

session.commit()
session.close()