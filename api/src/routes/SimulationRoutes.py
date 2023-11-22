from flask import Blueprint, request, jsonify
from EoN.simulation_investigation import Simulation_Investigation
from src.utils.Simulations import get_model_data_from_sim
import dill

main = Blueprint("sim_blueprint", __name__)


@main.route("/", methods=["POST"])
def generate_chart_from_sim():
    if request.method == "POST":
        uploaded_file = request.files["file"]
        zoom = True if "zoom" in request.form else False

        try:
            sim: Simulation_Investigation = dill.load(uploaded_file)
            if sim is not None:
                t, D = sim.summary()

                model_data = get_model_data_from_sim(t, D, zoom)
                response = jsonify({"inputs": {"zoom": zoom}, "positions": model_data})
                return response
            else:
                return jsonify({"error": "Invalid Simulation object file"})
        except Exception as e:
            response = jsonify({"error": "Invalid file format or not a valid simulation object"}), 400
            return response
