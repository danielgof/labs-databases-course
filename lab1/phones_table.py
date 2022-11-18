from dbtable import *


class PhonesTable(DbTable):
    def table_name(self):
        return self.dbconn.prefix + "phones"

    def columns(self):
        return {"person_id": ["integer", "REFERENCES people(id)"],
                "phone": ["varchar(12)", "NOT NULL"]}

    def primary_key(self):
        return ['person_id', 'phone']

    def table_constraints(self):
        return ["PRIMARY KEY(person_id, phone)"]

    def all_by_person_id(self, pid):
        sql = "SELECT * FROM " + self.table_name()
        sql += " WHERE person_id = :id"
        sql += " ORDER BY "
        sql += ", ".join(self.primary_key())
        cur = self.dbconn.conn.cursor()
        cur.execute(sql, str(pid))
        return cur.fetchall()

    def insert_one(self, pid, phone):  # sql injection
        sql = "INSERT INTO " + self.table_name()
        sql += " VALUES ("
        sql += "{0},{1})".format(pid, str(phone))
        cur = self.dbconn.conn.cursor()
        cur.execute(f'INSERT INTO {self.table_name()} VALUES (:pid' + f' , :phone)', {
            'pid': pid,
            'phone': str(phone)
        })
        self.dbconn.conn.commit()
        return

    def delete_one(self, phone):  # sql injection
        sql = "DELETE FROM " + self.table_name()
        sql += " WHERE phone="
        sql += str(phone)
        cur = self.dbconn.conn.cursor()
        cur.execute(f'DELETE FROM {self.table_name()} WHERE phone = :phone', {
            'phone': phone
        })
        self.dbconn.conn.commit()
        return
