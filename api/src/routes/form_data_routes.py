import networkx as nx
from flask import Blueprint, request, jsonify
from src.utils.generate_charts import get_model_data

main = Blueprint("chart_blueprint", __name__)


@main.route("/", methods=["POST"])
def generate_chart():
    if request.method == "POST":
        try:
            data = request.form
            files = request.files

            # Default network, in case no graphml file is provided
            N = 10**4
            G = nx.barabasi_albert_graph(N, 4)

            if "graphml" in files and files["graphml"]:
                graphml_file = files["graphml"]
                G = nx.read_graphml(graphml_file)

            # Get and parse data
            model = data["model"]
            states = list(data["states"])
            tau = float(data["transmissionRate"])
            gamma = float(data["recoveryRate"])
            rho = float(data["fractionInfected"])
            zoom = True if "zoom" in data else False

            model_data = get_model_data(G, model, states, tau, gamma, rho, zoom)

            response = jsonify({"inputs": data, "positions": model_data})
            return response
        except:
            response = jsonify({"error": "Invalid JSON data"}), 400
            return response
