from sqlalchemy.dialects.mysql import INTEGER
from werkzeug import generate_password_hash, check_password_hash  # noqa
from app import db, login_manager


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(INTEGER(unsigned=True), primary_key=True)
    username = db.Column(db.String(30))
    password = db.Column(db.String(110))
    email = db.Column(db.String(50))
    type_ = db.Column(db.Integer)
    authenticated = db.Column(db.Boolean, default=False)

    def __init__(self, username, password, email=''):
        self.username = username
        self.email = email.lower()
        self.set_password(password)
        self.type_ = 1

    def set_password(self, password):
        self.password = generate_password_hash(password,
                                               salt_length=len(self.username))

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # === Functions for login_manager ===
    
    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return self.authenticated

    def get_id(self):
        # Cast to string, because the function has to return a unicode variable
        return str(self.id)


@login_manager.user_loader
def get_user(id):
    return User.query.get(int(id))
