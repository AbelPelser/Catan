from flask import url_for, redirect, render_template, request, jsonify
from flask_login import current_user, login_required, login_user, logout_user

from app import app, db
from app.models import User
from . import user
from ..forms import LoginForm, RegisterForm


@user.route('/')
@login_required
def user_page():
    return "User page"


@user.route('/login/', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if request.method == 'POST':
        user = form.validate()
        if user:
            user.authenticated = True
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return redirect(url_for('index.index'))
    return render_template('login.html', form=form)


# Delete all session variabes, effectively logging out the user
@user.route('/logout/')
@login_required
def logout():
    user = current_user
    user.authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return redirect(url_for('index.index'))


# Handles registration of new users
@user.route('/register/', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST':
        user = form.validate()
        if user:
            user.authenticated = True
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('index.index'))
    return render_template('register.html', form=form)


# Return all playernames that start with searchString
# @user.route('/searchplayer/', methods=['POST'])
# def autocomplete_username():
#     in_ = request.json['searchString']
#     result = User.query.filter(User.username.startswith(in_)).all()
#     result = [{'value': r.username} for r in result]
#     return jsonify(result)
