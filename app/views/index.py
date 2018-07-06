from flask import url_for, redirect, request, session, render_template, jsonify

from app import db
from app.models.User import User

from . import main


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/canvas/')
def canvas():
    return render_template('canvas.html')

@main.route('/svg/')
def svg():
    return render_template('svg.html')