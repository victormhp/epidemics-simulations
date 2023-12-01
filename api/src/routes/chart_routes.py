import yaml
import dill
import networkx as nx
from flask import Blueprint, request, jsonify
from EoN.simulation_investigation import Simulation_Investigation
from src.utils.generate_charts import get_model_data, get_model_data_from_sim
from src.config.algorithms import epidemic_algorithms

chart = Blueprint("chart", __name__)


@chart.route("/form", methods=["POST"])
def generate_chart():
    if request.method == "POST":
        try:
            data = request.form.to_dict()
            files = request.files

            # Default network, in case no graphml file is provided
            N = 10**4
            G = nx.barabasi_albert_graph(N, 4)

            if "graphml" in files and files["graphml"]:
                graphml_file = files["graphml"]
                G = nx.read_graphml(graphml_file)

            # Get and parse data
            algorithm = data["algorithm"]
            model = data["model"]
            model_function = epidemic_algorithms[algorithm][model]

            zoom = bool(data.get("zoom", False))
            states = list(data["states"])
            tau = float(data["transmissionRate"])
            gamma = float(data["recoveryRate"])
            rho = float(data["fractionInfected"])

            model_data = get_model_data(G, model_function, zoom, states, tau, gamma, rho)

            response = jsonify({"positions": model_data})
            return response
        except:
            response = jsonify({"error": "Invalid JSON data"}), 400
            return response


@chart.route("/yaml", methods=["POST"])
def generate_chart_from_yaml():
    if request.method == "POST":
        files = request.files
        form = request.form
        zoom = bool(form.get("zoom", False))

        # Default network, in case no graphml file is provided
        N = 10**5
        G = nx.barabasi_albert_graph(N, 4)

        if "graphml" in files and files["graphml"]:
            graphml_file = files["graphml"]
            G = nx.read_graphml(graphml_file)

        yaml_file = files["yaml"]
        if yaml_file:
            file_content = yaml_file.read()

            try:
                data = yaml.safe_load(file_content)

                if data is not None:
                    # Get and parse data
                    algorithm = data["algorithm"]
                    model = data["model"]
                    model_function = epidemic_algorithms[algorithm][model]

                    states = list(data["states"])
                    tau = float(data["transmissionRate"])
                    gamma = float(data["recoveryRate"])
                    rho = float(data["fractionInfected"])

                    model_data = get_model_data(G, model_function, zoom, states, tau, gamma, rho)

                    response = jsonify({"inputs": data, "positions": model_data})
                    return response
                else:
                    return jsonify({"error": "Invalid YAML file"})
            except yaml.YAMLError as e:
                return jsonify({"error": "YAML parsing error: " + str(e)}), 400
        else:
            response = jsonify({"error": "No file provided"}), 400
            return response


@chart.route("/sim", methods=["POST"])
def generate_chart_from_sim():
    if request.method == "POST":
        files = request.files
        form = request.form

        sim_file = files["simulation_object"]
        zoom = bool(form.get("zoom", False))

        try:
            sim: Simulation_Investigation = dill.load(sim_file)
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
