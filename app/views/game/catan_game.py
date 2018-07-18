import random

from . import Board

class CatanGame(object):
    def __init__(self, board_coords):
        self.board = Board(board_coords)
        self.colors = ['blue', 'white', 'orange', 'red']
        self.players = {'blue': None, 'white': None, 'orange': None, 'red': None}
        # 0 for initialization, 1 for in progress, 2 for finished
        self.status = 0;
        # a User object
        self.turn = None

        self.dice_val = (0, 0);

    def signup_player(self, user, color):
        if color not in self.colors or user in self.players.values():
            return False


    def build(self, entity, player):
        pass

    def roll_dice(self):
        self.dice_val = (random.randint(1, 6), random.randint(1, 6))
        

    def __str__(self):
        return ''