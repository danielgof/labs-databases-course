from dbtable import *

class PeopleTable(DbTable):
    def table_name(self):
        return self.dbconn.prefix + "people"

    def columns(self):
        return {"id": ["integer", "PRIMARY KEY", "AUTOINCREMENT"],
                "last_name": ["varchar(32)", "NOT NULL"],
                "first_name": ["varchar(32)", "NOT NULL"],
                "second_name": ["varchar(32)"]}

    def find_by_position(self, num):
        sql = "SELECT * FROM " + self.table_name()
        sql += " ORDER BY "
        sql += ", ".join(self.primary_key())
        sql += " LIMIT 1 OFFSET :offset"
        cur = self.dbconn.conn.cursor()
        cur.execute(sql, {"offset": num - 1})
        return cur.fetchone()


    def delete_one(self, num):  # sql injection
        sql = "DELETE FROM " + self.table_name()
        sql += " WHERE id="
        sql += str(num)
        cur = self.dbconn.conn.cursor()
        cur.execute(sql)
        self.dbconn.conn.commit()
        return