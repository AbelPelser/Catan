from flask import url_for, redirect, render_template

from app import db
from app.models.User import User

from . import main, user


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/svg/')
def svg():
    return render_template('svg.html')

@main.route('/login/', methods=['GET', 'POST'])
def login():
    return redirect(url_for('user.login'), code=307)

@main.route('/logout/')
def logout():
    return redirect(url_for('user.logout'), code=307)

@main.route('/register/', methods=['GET', 'POST'])
def register():
    return redirect(url_for('user.register'), code=307)