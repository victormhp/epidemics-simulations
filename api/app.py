from models import get_model_data
from flask import Flask, request, jsonify
from flask_cors import CORS
import yaml


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["*"]}})


@app.route("/api/models", methods=["POST"])
def simulations():
    try:
        data = request.get_json()

        required_attributes = ["model", "transmissionRate", "recoveryRate", "fractionInfected"]
        missing_attributes = [attr for attr in required_attributes if attr not in data]

        # Get and parse data
        model = data["model"]
        tau = float(data["transmissionRate"])
        gamma = float(data["recoveryRate"])
        rho = float(data["fractionInfected"])

        model_data = get_model_data(model, tau, gamma, rho)

        if missing_attributes:
            return jsonify({"error": f'Missing attributes: {", ".join(missing_attributes)}'}), 400

        return jsonify({"inputs": data, "positions": model_data})
    except:
        response = jsonify({"error": "Invalid JSON data"}), 400
        return response


if __name__ == "__main__":
    app.run(debug=True)
