import psycopg2
from psycopg2 import Error

class Database:
    """функция инициализации подключения"""
    def connect():
        try:
            connection = psycopg2.connect(user="postgres",
                                    password="admin",  
                                    host="127.0.0.1",
                                    port="5432",
                                    database="lab")
            print("conect to db successfully")
            return connection
        except (Exception, Error) as error:
            print("Ошибка при работе с PostgreSQL", error)

    """создание таблиц"""
    def create(connection):
        try:
            cursor = connection.cursor()
            """query create table"""
            create_table_query = """
            DROP TABLE IF EXISTS positions;
            CREATE TABLE positions (
            id serial PRIMARY KEY,
            department varchar(32) NOT NULL,
            salary varchar(32) NOT NULL,
            position varchar(32));

            DROP TABLE IF EXISTS people;
            CREATE TABLE people (
            id serial PRIMARY KEY,
            last_name varchar(32) NOT NULL,
            first_name varchar(32) NOT NULL,
            position_id integer REFERENCES positions (id)
            );

            DROP TABLE IF EXISTS phones;
            CREATE TABLE phones (
            person_id integer REFERENCES people (id),
            phone varchar(12) NOT NULL);
            """
            # Выполнение команды: это создает новую таблицу
            cursor.execute(create_table_query)
            connection.commit()
            print("Таблица успешно создана в PostgreSQL")
        except (Exception, Error) as error:
            print("Ошибка при работе с PostgreSQL", error)

    def all_persons_data(connection):
        try:
            people = []
            cursor = connection.cursor()
            """show all data about people"""
            create_table_query = """select * from people;"""
            cursor.execute(create_table_query)
            res = cursor.fetchall()
            for r in range(len(res)):
              d = {'id':'', 'last_name': '', 'first_name': '', 'position_id': ''}
              d["id"] = res[r][0]
              d["last_name"] = res[r][1]
              d["first_name"] = res[r][2]
              d["position_id"] = res[r][3]
              people.append(d)
            return people
        except (Exception, Error) as error:
            print("Ошибка при работе с PostgreSQL", error)

    def delete_person(connection, id):
        try:
            cursor = connection.cursor()
            create_table_query = f"""delete from people where id={id};"""
            cursor.execute(create_table_query)
            connection.commit()
            # Close communication with the PostgreSQL database
            cursor.close()
            # res = cursor.fetchall()
            return f"person with {id} id deleted"
        except (Exception, Error) as error:
            print("Ошибка при работе с PostgreSQL", error)


    def get_number(connection, id):
        try:
            phones = []
            cursor = connection.cursor()
            """show all data about people"""
            create_table_query = f"""select * from phones where person_id={id};"""
            cursor.execute(create_table_query)
            res = cursor.fetchall()
            for r in range(len(res)):
              d = {'person_id':'', 'phone_num': ''}
              d["person_id"] = res[r][0]
              d["phone_num"] = res[r][1]
              phones.append(d)
            return phones
        except (Exception, Error) as error:
            print("Ошибка при работе с PostgreSQL", error)

# connection = Database.connect()
# # Database.create(connection)
# # Database.all_persons_data(connection)
# Database.delete_person(connection, 4)
# Database.get_number(connection, 3)