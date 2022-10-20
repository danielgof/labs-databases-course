from dbtable import *

class PositionsTable(DbTable):
    def table_name(self):
        return self.dbconn.prefix + "postions"

    def columns(self):
        return {"id": ["integer", "PRIMARY KEY", "AUTOINCREMENT"],
                "department": ["varchar(32)", "NOT NULL"],
                "salary": ["integer", "NOT NULL"],
                "position": ["varchar(64)"]}