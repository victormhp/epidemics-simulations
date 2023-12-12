from flask import Blueprint, send_from_directory

home = Blueprint("home", __name__)


@home.route("/")
def index():
    return send_from_directory('build', 'index.html')
