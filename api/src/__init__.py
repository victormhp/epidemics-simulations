from flask import Flask
from flask_cors import CORS

# Routes
from .routes import form_data_routes, simulation_object_routes, yaml_data_routes

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def init_app():
    # Blueprints
    app.register_blueprint(form_data_routes.main, url_prefix="/api/form")
    app.register_blueprint(yaml_data_routes.main, url_prefix="/api/yaml")
    app.register_blueprint(simulation_object_routes.main, url_prefix="/api/sim")

    return app
