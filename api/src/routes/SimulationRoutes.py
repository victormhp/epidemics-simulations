from flask import Blueprint, request, jsonify
import dill

main = Blueprint("sim_blueprint", __name__)


@main.route("/", methods=["POST"])
def generate_chart_from_sim():
    if request.method == "POST":
        uploaded_file = request.files.get("file")

        try:
            sim = dill.load(uploaded_file)
            return sim.summary()
        except Exception as e:
            response = jsonify({"error": "Invalid file format or not a valid simulation object"}), 400
            return response
