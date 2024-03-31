from flask import Flask, session, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User
from models import db
from authentication import authentication_bp
import sys
import os

app = Flask(__name__)
bcrypt = Bcrypt()

app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, supports_credentials=True)
app.config.from_pyfile("/login/backend/config.py")
app.register_blueprint(authentication_bp)

os.environ['CONFIG'] = "/login/backend/config.py"

if "CONFIG" in os.environ:
    app.config.from_envvar("CONFIG")

db.init_app(app)

with app.app_context():
    db.create_all()

    admin_user = User.query.filter_by(email='admin').first()
    if not admin_user:
        hashed_password = bcrypt.generate_password_hash('admin').decode('utf-8')
        admin_user = User(email='admin',name='Admin', password=hashed_password)
        db.session.add(admin_user)
        db.session.commit()


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
    })


from flask import request

@app.route('/users', methods=['GET'])
def get_users():
    logged_in_user_id = session.get('user_id')
    users = User.query.all()
    user_data = [{'id': user.id, 'name': user.name} for user in users if user.id != logged_in_user_id]
    return jsonify(user_data)



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
