import psycopg2
from psycopg2 import Error
from config import * 


class DbConnection:

    def __init__(self, config):
        
        self.user = config.user
        self.password = config.password
        self.host = config.host
        self.port = config.port
        self.database = config.database

        self.conn = psycopg2.connect(
                user=self.user,
                password=self.password,  
                host=self.host,
                port=self.port,
                database=self.database
                )


    def __del__(self):
        if self.conn:
            self.conn.close()


    def test(self):
        cur = self.conn.cursor()
        cur.execute("CREATE TABLE test(test integer)")
        cur.execute("INSERT INTO test(test) VALUES(1)")
        self.conn.commit()
        cur.execute("SELECT * FROM test")
        result = cur.fetchall()
        cur.execute("DROP TABLE test")
        self.conn.commit()
        return (result[0][0] == 1)
        

