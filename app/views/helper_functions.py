from flask import session
from .game.catan_game import CatanGame

from .globals import glob_vars

# Checks if the session contains an active game id, or if a user takes part in a certain game
def is_in_game():
    if session.get('game') in glob_vars.games:
        return True
    return False

def joingame():
    session['game'] = glob_vars.tmp_game_id
    if glob_vars.tmp_game_id not in glob_vars.games:
        # (id, col, row)
        board_coords = [
                        (19, 2, 0), (20, 3, 0), (21, 4, 0), (22, 5, 0),
                    (23, 1, 1), (0, 2, 1), (1, 3, 1), (2, 4, 1), (24, 5, 1),
                (25, 1, 2), (3, 2, 2), (4, 3, 2), (5, 4, 2), (6, 5, 2), (26, 6, 2),
            (27, 0, 3), (7, 1, 3), (8, 2, 3), (9, 3, 3), (10, 4, 3), (11, 5, 3), (28, 6, 3),
                (29, 1, 4), (12, 2, 4), (13, 3, 4), (14, 4, 4), (15, 5, 4), (30, 6, 4),
                    (31, 1, 5), (16, 2, 5), (17, 3, 5), (18, 4, 5), (32, 5, 5),
                        (33, 2, 6), (34, 3, 6), (35, 4, 6), (36, 5, 6)
        ]
        game = CatanGame(board_coords)
        game.db_id = glob_vars.tmp_game_id
        glob_vars.games[glob_vars.tmp_game_id] = game
    return glob_vars.games[glob_vars.tmp_game_id]