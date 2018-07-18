from flask import jsonify, redirect, render_template, request, session, url_for
from flask_login import current_user, login_required

from app import db
from . import game_route
from .globals import glob_vars
from .helper_functions import is_in_game, joingame
from .socket_functions import send_chat


# Displays the game with the id stored in the current session
@game_route.route('/')
@login_required
def game():
    # Check if user already has a game going on
    if is_in_game():
        game = glob_vars.games[session.get('game')]
    else:
        game = joingame()
    return redirect(url_for('game_routes.game_by_id', game_id=game.db_id))


# Joins a game based on a unique game id
@game_route.route('/<int:game_id>/')
@login_required
def game_by_id(game_id):
    if game_id in glob_vars.games:
        game = glob_vars.games[game_id]
    else:
        game = joingame()
        return redirect(url_for('game_routes.game_by_id', game_id=game.db_id))
    return render_template('svg.html', game=game)


# Allows players to talk in their game chat
@game_route.route('/chat/', methods=['POST'])
@login_required
def chat():
    name = current_user.username
    msg = {'type': 'chat', 'data': {'msg': request.json['msg'], 'from': name}}
    send_chat(msg)
    return jsonify(dict(success=True))
