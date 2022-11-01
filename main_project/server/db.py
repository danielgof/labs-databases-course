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
            second_name varchar(32) NOT NULL,
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


connection = Database.connect()
Database.create(connection)