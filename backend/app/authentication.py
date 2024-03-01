from flask import Blueprint, request, session, jsonify
from flask_bcrypt import Bcrypt
from models import db, User

authentication_bp = Blueprint('authentication', __name__)
bcrypt = Bcrypt()

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')


def validate_password(hashed_password, password):
    return bcrypt.check_password_hash(hashed_password, password)


@authentication_bp.route('/register', methods=['POST'])
def register():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    else:
        hashed_password = hash_password(password)
        new_user = User(name=name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id
    

        return jsonify({
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }), 201



@authentication_bp.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user and validate_password(user.password, password):
        session["user_id"] = user.id
        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email
        }), 200
    else:
        return jsonify({"error": "Unauthorized"}), 401