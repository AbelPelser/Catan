import math

class Crossing(object):
    def __init__(self):
        self.neighbours = []
        self.edges = []

    def add_neighbour(self, neighbour):
        assert(type(neighbour) == Crossing)
        if neighbour not in self.neighbours:
            self.neighbours.append(neighbour)

class Edge(object):
    # vert_a and vert_b are only used during initialization
    def __init__(self, vert_a, vert_b):
        self.vert_a = vert_a
        self.vert_b = vert_b
        self.neighbours = {self.vert_a: [], self.vert_b: []}

    def add_neighbour(self, neighbour):
        assert(type(neighbour) == Edge)
        assert(neighbour != self)
        if neighbour.borders(self.vert_a):
            if neighbour not in self.neighbours[self.vert_a]:
                self.neighbours[self.vert_a].append(neighbour)
        elif neighbour.borders(self.vert_b):
            if neighbour not in self.neighbours[self.vert_b]:
                self.neighbours[self.vert_b].append(neighbour)
        else:
            print('PANIC Edge.add_neighbour')
        
    def borders(self, vert):
        if vert == self.vert_a or vert == self.vert_b:
            return True
        return False

    def connects(self, nb_a, nb_b):
        if (nb_a in self.neighbours[self.vert_a] and nb_b in self.neighbours[self.vert_b]) or \
           (nb_b in self.neighbours[self.vert_a] and nb_a in self.neighbours[self.vert_b]):
           return True
        return False

class Field(object):
    def __init__(self, field_id):
        self.crossings = []
        self.edges = []
        self.id = field_id

    def add_neighbour(self, neighbour):
        assert(type(neighbour) == Field)

# This class is used for quickly comparing floating point numbers, while throwing away small inaccuracies
class Coord(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __eq__(self, other):
        return ((round(self.x, 6) == round(other.x, 6)) and (round(self.y, 6) == round(other.y, 6)))
    def __str__(self):
        return '({:f},{:f})'.format(round(self.x, 6), round(self.y, 6))
    def __repr__(self):
        return str(self)
    def __hash__(self):
        return hash(str(self))

class Board(object):
    def __init__(self, coords):
        self.building = None

        fields = []
        # {(x, y): Crossing}
        crossings = {}
        # {{(x1, y1), (x2, y2)} : Edge}
        unique_edges = {}

        # We use the coordinates of the fields' vertices to identify edges and crossings
        # One field is a hexagon, consisting of 6 triangles, with sides r
        # t_height is the perpendicular bisector of such a triangle; every field has height (2*r) and width (2*t_height)
        r = 1
        t_height = math.sqrt(0.75*r**2)
        for field_id, col, row in coords:
            fields.append(Field(field_id))
            # Calculate the field's central coordinate
            x = 2 * col * t_height
            if row % 2 == 1:
                x += t_height
            y = r + row * r * 1.5
            fields[-1].vertices = [
                Coord(x, y - r),
                Coord(x + t_height, y - 0.5 * r),
                Coord(x + t_height, y + 0.5 * r),
                Coord(x, y + r),
                Coord(x - t_height, y + 0.5 * r),
                Coord(x - t_height, y - 0.5 * r)
            ]
        for field in fields:
            # Initialize crossings
            for vertex in field.vertices:
                if vertex not in crossings.keys():
                    crossings[vertex] = Crossing()
                field.crossings.append(crossings[vertex])
            vert = field.vertices
            for i in range(len(vert)):
                # Set up neighbour crossing relations around this field - duplicates are filtered out by Crossing.add_neighbour
                crossings[vert[i-1]].add_neighbour(crossings[vert[i]])
                crossings[vert[i]].add_neighbour(crossings[vert[i-1]])
                # Initialize edges
                edge_fs = frozenset({vert[i-1], vert[i]})
                if edge_fs not in unique_edges.keys():
                    unique_edges[edge_fs] = Edge(vert[i-1], vert[i])
                # Register the edge at both neighbouring crossings
                if unique_edges[edge_fs] not in crossings[vert[i-1]].edges:
                    crossings[vert[i-1]].edges.append(unique_edges[edge_fs])
                if unique_edges[edge_fs] not in crossings[vert[i]].edges:
                    crossings[vert[i]].edges.append(unique_edges[edge_fs])
                # Register the edge at the field
                field.edges.append(unique_edges[edge_fs])
        # All edges and crossings have been initialized - finally, set up edge-edge neighbour relations
        for field in fields:
            for crossing in field.crossings:
                for edge in crossing.edges:
                    for edge_nb in [e for e in crossing.edges if e != edge]:
                        edge.add_neighbour(edge_nb)