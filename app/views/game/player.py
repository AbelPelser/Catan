class Player(object):
    def __init__(self, user, color):
        self.color = color
        self.user = user
        self.points = 0
        self.cards = {
            'resource': {
                'grain': 0,
                'ore': 0,
                'stone': 0,
                'wood': 0,
                'wool': 0
            },
            'development': {
                'build_roads': 0,
                'knight': 0,
                'monopoly': 0,
                'point': 0
            }
        }
        self.pieces = {
            'city': 4,
            'road': 15,
            'settlement': 5
        }

    def can_build(self, entity):
        return (len(self.pieces[entity]) > 0)

    def build_city(self):
        pass

    def build_settlement(self):
        pass

    def __str__(self):
        return 'Player {:s}'.format(self.user.username)