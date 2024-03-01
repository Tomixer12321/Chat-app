from flask import Flask, session
from flask_cors import CORS
from models import db
import sys
import os
from authentication import authentication_bp

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, supports_credentials=True)
app.config.from_pyfile("/login/backend/config.py")
app.register_blueprint(authentication_bp)

os.environ['CONFIG'] = "/login/backend/config.py"

if "CONFIG" in os.environ:
    app.config.from_envvar("CONFIG")



db.init_app(app)


@app.route('/')
def hello():
    return 'Hello, World!'


def init_db():
   with app.app_context():
        db.create_all()
        print("Database initialized.")


if __name__ == '__main__':
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == "start":
            app.run(debug=True)
        elif command == "init_db":
                init_db()
    else:
        print("Usage:\n\n\tapp.py [start|init_db]")
