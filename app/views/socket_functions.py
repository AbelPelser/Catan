from app import socketio
from flask import session, request
from flask_socketio import send, emit, join_room, leave_room
from flask_login import current_user

from .globals import glob_vars
from .helper_functions import is_in_game

@socketio.on('connect')
def connect():
    if is_in_game():
        join_room(session.get('game'))
        emit('connect_confirm')
        text = '{0} has connected.'.format(current_user.username)
        chat_data = {'type': 'connect_alert', 'data': {'msg': text}}
        send_chat(chat_data)
        send_global_chat(chat_data)
        glob_vars.session_ids[current_user.id] = request.sid
    else:
        return False

@socketio.on('disconnect')
def disconnect():
    if is_in_game():
        leave_room(session.get('game'))
        text = '{} has disconnected.'.format(current_user.username)
        chat_data = {'type': 'connect_alert', 'data': {'msg': text}}
        send_chat(chat_data)
        send_global_chat(chat_data)
        try:
            del glob_vars.session_ids[current_user.id]
        except:
            pass

# Sends a chat message to all players in a game
def send_chat(chat_data):
    emit('chat', {'chat_data': chat_data}, room=session.get('game'), namespace='/')

# Sends a chat message to *everyone* who is online
def send_global_chat(chat_data):
    emit('chat', {'chat_data': chat_data}, broadcast=True, namespace='/')

# Sends a message to indicate that both players should refresh their game
def send_refresh_msg():
    emit('refresh', room=session.get('game'), namespace='/')

# Sends attribute update to 1 player (change value of an attribute of a tag)
def send_attribute_update(element, attr, value, player_id):
    sid = glob_vars.session_ids.get(player_id)
    if sid:
        emit('update_attr', {'element': element, 'attr': attr, 'value': value},
             room=sid, namespace='/')