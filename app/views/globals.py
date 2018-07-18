class Vars(object):
    def __init__(self):
        self.rooms = {}
        self.session_ids = {}
        self.games = {}
        self.tmp_game_id = 1

glob_vars = Vars()