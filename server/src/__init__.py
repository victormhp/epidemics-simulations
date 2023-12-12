from flask import Flask, send_from_directory
from flask_cors import CORS

# Routes
from .routes import chart_routes, home_routes

app = Flask(__name__, static_folder="./build", static_url_path='/')
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.errorhandler(404)
def page_not_found(err):
    return send_from_directory('build', 'index.html')


def init_app():
    # Blueprints
    app.register_blueprint(home_routes.home, url_prefix="/")
    app.register_blueprint(chart_routes.chart, url_prefix="/api")

    return app
