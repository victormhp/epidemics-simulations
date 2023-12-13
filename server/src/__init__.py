import os
import sys
from flask import Flask
from flask_cors import CORS

# Routes
from .routes import chart_routes


# When the site is running in packaged form, the templates are inside a directory 
# called _MEIxxxxxx under the temp directory and you have to tell Flask about this.
if getattr(sys, 'frozen', False):
    static_folder = os.path.join(sys._MEIPASS, './build')
    app = Flask(__name__, static_folder=static_folder, static_url_path='/')
else:
    app = Flask(__name__, static_folder="./build", static_url_path='/')


CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def page_not_found(err):
    return app.send_static_file("index.html")


def init_app():
    # Blueprints
    app.register_blueprint(chart_routes.chart, url_prefix="/api")

    return app
