import os

from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from jinja2 import Markup
from json import dumps

version = '0.1'

app = Flask(__name__)
app.config.from_object('flask_config.Config')
app.secret_key = 'os.urandom(10)'

db = SQLAlchemy(app)
db.init_app(app)

socketio = SocketIO(app)

jinja_environ = app.create_jinja_environment()
jinja_environ.globals['current_user'] = current_user

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'user.login'

# The User class also contains functions related to LoginManager
from .models.User import User


def debug():
    assert not app.debug, 'debug() called'


_js_escapes = {
    '\\': '\\u005C',
    '\'': '\\u0027',
    '"': '\\u0022',
    '&gt;': '\\u003E',
    '&lt;': '\\u003C',
    '&amp;': '\\u0026',
    '=': '\\u003D',
    '-': '\\u002D',
    ';': '\\u003B',
    u'\u2028': '\\u2028',
    u'\u2029': '\\u2029'
}

# Escape every ASCII character with a value less than 32.
_js_escapes.update(('%c' % z, '\\u%04X' % z) for z in range(32))


def jinja2_escapejs_filter(value):
    retval = []
    for letter in value:
            if letter in _js_escapes:
                    retval.append(_js_escapes[letter])
            else:
                    retval.append(letter)

    return Markup("".join(retval))
app.jinja_env.filters['escapejs'] = jinja2_escapejs_filter


def jinja2_replace_quotes(value):
    retval = []
    for letter in value:
        if letter == '"':
            retval.append("'")
        elif letter == '\n':
            retval.append("")
        else:
            retval.append(letter)
    return Markup("".join(retval))

app.jinja_env.filters['escapequotes'] = jinja2_replace_quotes
# Filter for the json values
app.jinja_env.filters['jsonify'] = dumps
