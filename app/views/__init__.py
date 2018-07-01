from flask import Blueprint

main = Blueprint('index', __name__)
# game_route = Blueprint('game', __name__, url_prefix='/game')
all_views = [main]

import app.views.index, app.views.socket_functions
