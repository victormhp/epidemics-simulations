from flask import Blueprint, send_from_directory

home = Blueprint("home", __name__)


@home.route("/")
def base():
    return send_from_directory("static/build", "index.html")


@home.route("/<path:path>")
def assets(path):
    return send_from_directory("static/build", path)
