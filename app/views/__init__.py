from flask import Blueprint

main = Blueprint('index', __name__)
user = Blueprint('user', __name__, url_prefix='/user')
game_setup = Blueprint('game_setup', __name__, url_prefix='/game/setup')
game_route = Blueprint('game_routes', __name__, url_prefix='/game')

all_views = [main, user, game_setup, game_route]

import app.views.index, app.views.socket_functions, app.views.user, app.views.game_setup, app.views.game_routes

from app.views.game.board import Board
from app.views.game.catan_game import CatanGame
from app.views.game.player import Player