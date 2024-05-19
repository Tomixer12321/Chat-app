from flask import Flask, session, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room
from sqlalchemy import or_, and_
from models import db, User, ChatRoom, Message
from authentication import authentication_bp
import sys
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins="*")

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
        hashed_password = bcrypt.generate_password_hash(
            'admin').decode('utf-8')
        admin_user = User(email='admin', name='Admin',
                          password=hashed_password)
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


@app.route('/users', methods=['GET'])
def get_users():
    logged_in_user_id = session.get('user_id')
    users = User.query.all()
    user_data = [{'id': user.id, 'name': user.name}
                 for user in users if user.id != logged_in_user_id]
    return jsonify(user_data)


@app.route("/start_chat", methods=["POST"])
def create_or_get_chatroom():
    user_id_1 = session.get('user_id')
    target_user_id = request.json.get('user_id_2')

    initiator_id = user_id_1
    target_id = target_user_id

    if user_id_1 != target_user_id:
        initiator_id, target_id = target_user_id, user_id_1
    existing_chatroom = ChatRoom.query.filter(or_(
        and_(ChatRoom.name1 == initiator_id, ChatRoom.name2 == target_id),
        and_(ChatRoom.name1 == target_id, ChatRoom.name2 == initiator_id)
    )).first()

    if existing_chatroom:
        return jsonify({"chatroom_id": existing_chatroom.id})
    chatroom = ChatRoom(name1=initiator_id, name2=target_id,
                        description="Chatroom for users")
    db.session.add(chatroom)
    db.session.commit()

    return jsonify({"chatroom_id": chatroom.id})


@app.route("/send_message", methods=["POST"])
def send_message():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    recipient_id = request.json.get("recipient_id")
    chatroom_id = request.json.get("chatroom_id")
    content = request.json.get("content")

    if not (recipient_id and content and chatroom_id):
        return jsonify({"error": "Invalid data"}), 400

    message = Message(sender_id=user_id, recipient_id=recipient_id,
                      content=content, chatroom_id=chatroom_id)
    db.session.add(message)
    db.session.commit()

    socketio.emit('receive_message', {
        'content': content,
    }, room=chatroom_id)

    return jsonify({"message_id": message.id})


@app.route('/messages', methods=['GET'])
def get_messages():
    user_id = session.get("user_id")
    chatroom_id = request.args.get("chatroom_id")
    target_user_id = request.args.get("target_user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    if not (chatroom_id and target_user_id):
        return jsonify({"error": "Invalid data"}), 400

    messages = Message.query.filter(
        Message.chatroom_id == chatroom_id,
        or_(
            and_(Message.sender_id == user_id,
                 Message.recipient_id == target_user_id),
            and_(Message.sender_id == target_user_id,
                 Message.recipient_id == user_id)
        )
    ).all()

    messages_data = [
        {
            'content': message.content
        }
        for message in messages
    ]

    return jsonify(messages_data), 200


@socketio.on('connect')
def test_connect():
    print('Client connected')


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('join')
def on_join(data):
    chatroom_id = data['chatroom_id']
    join_room(chatroom_id)
    print(f"User joined chatroom {chatroom_id}")


def init_db():
    with app.app_context():
        db.create_all()
        print("Database initialized.")


if __name__ == '__main__':
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == "start":
            socketio.run(app, debug=True)
        elif command == "init_db":
            init_db()
    else:
        print("Usage:\n\n\tapp.py [start|init_db]")
