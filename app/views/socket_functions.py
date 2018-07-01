from app import socketio
from flask import session, request
from flask_socketio import send, emit, join_room, leave_room
from flask_login import current_user

from .globals import glob_vars

TESTROOM = 1

@socketio.on('connect')
def connect():
    join_room(TESTROOM)
    emit('connect_confirm')
    glob_vars.session_ids[current_user.id] = request.sid

@socketio.on('disconnect')
def disconnect():
    leave_room(TESTROOM)
    try:
        del glob_vars.session_ids[current_user.id]
    except:
        pass

# Sends attribute update to 1 player (change value of an attribute of a tag)
def send_attribute_update(element, attr, value, player_id):
    sid = glob_vars.session_ids.get(player_id)
    if sid:
        emit('update_attr', {'element': element, 'attr': attr, 'value': value},
             room=sid, namespace='/')

