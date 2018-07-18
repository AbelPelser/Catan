from flask import session, jsonify
from flask_login import login_required
import json

from app import db
from . import game_setup
from .globals import glob_vars
# from .helper_functions import active_game_required



@game_setup.route('/random/', methods=['POST'])
@login_required
# @active_game_required(json=True)
def random_setup():
    game = glob_vars.games[session.get('game')]
    return jsonify(dict(success=True, msg=''))


# During board set up only: Set up a field type
@game_setup.route('/fieldtype/', methods=['POST'])
@login_required
# @active_game_required(json=True)
def setup_fieldtype():
    game = glob_vars.games[session.get('game')]
    field_id = request.json['fieldId']
    field_type = request.json['type']

    return jsonify(dict(success=True, msg=''))


# During board set up only: Set up a field number
@game_setup.route('/fieldnumber/', methods=['POST'])
@login_required
# @active_game_required(json=True)
def setup_fieldnumber():
    game = glob_vars.games[session.get('game')]
    field_id = request.json['fieldId']
    number = int(request.json['number'])

    return jsonify(dict(success=True, msg=''))