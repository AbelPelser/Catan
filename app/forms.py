'''
This code contains the structure for the various forms used on the website.
Required fields and validators as well as messages are defined for each form.
The names and purposes of the forms can be derived and are self-explanatory.
'''

from wtforms import validators, SubmitField, TextField, PasswordField, Form
from app import app, db
from app.models.User import User
import string


class LoginForm(Form):
    username = TextField('Username', [validators.Required(
        'Please enter your username')])
    password = PasswordField('Password', [validators.Required(
        'Please enter your password')])
    submit = SubmitField('Log in')

    def __init__(self, *args, **kwargs):
        Form.__init__(self, *args, **kwargs)

    def validate(self):
        if not Form.validate(self):
            return None
        user = User.query.filter_by(username=self.username.data).first()
        if not user:
            self.username.errors.append('User doesn\'t exist')
            return None
        if not user.check_password(self.password.data):
            self.password.errors.append('Incorrect password')
            return None
        return user


class RegisterForm(Form):
    username = TextField('Username', [validators.Required(
        'Please choose a username')])
    password = PasswordField('Password', [validators.Required(
        'Please choose a password')])
    repeat_password = PasswordField('Repeat Password', [validators.Required(
        'Please repeat your password')])
    submit = SubmitField('Register')

    def __init__(self, *args, **kwargs):
        Form.__init__(self, *args, **kwargs)

    def validate(self):
        if not Form.validate(self):
            return None
        user = User.query.filter_by(username=self.username.data).first()
        if user:
            self.username.errors.append('This username is already in use')
            return False
        else:
            if self.password.data != self.repeat_password.data:
                self.repeat_password.errors.append('Passwords don\'t match')
                return False
            allowed = set(string.ascii_lowercase + string.ascii_uppercase + string.digits + ' ')
            if set(self.username.data) <= allowed:
                if len(self.username.data) < 16:
                    new_user = User(self.username.data, self.password.data)
                    db.session.add(new_user)
                    db.session.commit()
                    return new_user
                else:
                    self.username.errors.append('Username must be 15 characters or less')
                    return False
            else:
                self.username.errors.append('Username may only contain letters and digits')
                return False