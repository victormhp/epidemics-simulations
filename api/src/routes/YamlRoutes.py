from flask import Blueprint, request, jsonify
from src.utils.Simulations import get_model_data
import yaml

main = Blueprint("yaml_blueprint", __name__)


@main.route("/", methods=["POST"])
def generate_chart_from_yaml():
    if request.method == "POST":
        uploaded_file = request.files.get("file")

        if uploaded_file:
            file_content = uploaded_file.read()

            try:
                data = yaml.safe_load(file_content)

                if data is not None:
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
                else:
                    return jsonify({"error": "Invalid YAML file"})
            except yaml.YAMLError as e:
                return jsonify({"error": "YAML parsing error: " + str(e)}), 400
        else:
            response = jsonify({"error": "No file provided"}), 400
            return response
