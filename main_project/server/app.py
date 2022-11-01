from crypt import methods
from flask import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def index():
    return "index"


@app.route("/get_all_people_data", methods=["GET"])
def get_all_data():
    pass


if __name__ == "__main__":
    app.run()