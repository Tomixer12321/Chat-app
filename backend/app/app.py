from flask import Flask, session, jsonify
from models import db, User
from flask_cors import CORS
from models import db
from authentication import authentication_bp
import sys
import os

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, supports_credentials=True)
app.config.from_pyfile("/login/backend/config.py")
app.register_blueprint(authentication_bp)

os.environ['CONFIG'] = "/login/backend/config.py"

if "CONFIG" in os.environ:
    app.config.from_envvar("CONFIG")

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)

    return jsonify({
        "name": user.name,
        "email": user.email,
    })


db.init_app(app)


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
