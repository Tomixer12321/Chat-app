from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    ChatRooms = db.relationship(
        'ChatRoom', secondary='user_chat_association', backref='users')


class ChatRoom(db.Model):
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    name1 = db.Column(db.String(100), nullable=False)
    name2 = db.Column(db.String(255))
    description = db.Column(db.String(255))


user_chat_association_table = db.Table(
    'user_chat_association',
    db.Column('User_id_1', db.String(32), db.ForeignKey(User.id)),
    db.Column('ChatRoom_id', db.String(32), db.ForeignKey(ChatRoom.id))
)


class Message(db.Model):
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=lambda: uuid4().hex)
    sender_id = db.Column(db.String(32), db.ForeignKey("user.id"))
    recipient_id = db.Column(db.String(32), db.ForeignKey("user.id"))
    content = db.Column(db.String(1000))
