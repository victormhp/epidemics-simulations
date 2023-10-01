from flask import Flask
from flask_cors import CORS

# Routes
from .routes import ChartRoutes, YamlRoutes, SimulationRoutes

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def init_app():
    # Blueprints
    app.register_blueprint(ChartRoutes.main, url_prefix="/api/models")
    app.register_blueprint(YamlRoutes.main, url_prefix="/api/yaml")
    app.register_blueprint(SimulationRoutes.main, url_prefix="/api/sim")

    return app
