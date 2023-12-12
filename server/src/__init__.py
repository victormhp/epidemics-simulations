from flask import Flask
from flask_cors import CORS

# Routes
from .routes import chart_routes, home_routes

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def init_app():
    # Blueprints
    app.register_blueprint(home_routes.home, url_prefix="/")
    app.register_blueprint(chart_routes.chart, url_prefix="/api")

    return app
