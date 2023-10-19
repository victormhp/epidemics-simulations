from flask import Blueprint, request, jsonify
from src.utils.Simulations import get_model_data

main = Blueprint("chart_blueprint", __name__)


@main.route("/", methods=["POST"])
def generate_chart():
    if request.method == "POST":
        try:
            data = request.get_json()

            # Get and parse data
            model = data["model"]
            states = data["states"]
            tau = float(data["transmissionRate"])
            gamma = float(data["recoveryRate"])
            rho = float(data["fractionInfected"])
            zoom = True if "zoom" in data else False

            model_data = get_model_data(model, states, tau, gamma, rho, zoom)

            response = jsonify({"inputs": data, "positions": model_data})
            return response
        except:
            response = jsonify({"error": "Invalid JSON data"}), 400
            return response
