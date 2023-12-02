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
    if request.method != "POST":
        return jsonify({"error": "Method Not Allowed"}), 405

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
        algorithm = data["algorithm"]
        model = data["model"]
        model_function = epidemic_algorithms[algorithm][model]

        states = list(data["states"])
        iterations = int(data["iterations"])
        zoom = bool(data.get("zoom", False))

        # Exclude already extracted data (e.g., algorithm choice, model choice, zoom, states, iterations)
        # Keep only the parameters relevant to the desired algorithm, converting them to float if needed
        excluded_keys = ["algorithm", "model", "zoom", "states", "iterations"]
        algorithm_parameters = {key: float(value) for key, value in data.items() if key not in excluded_keys}

        model_data = get_model_data(G, model_function, states, iterations, zoom, **algorithm_parameters)

        return jsonify({"positions": model_data})
    except:
        return jsonify({"error": "Invalid JSON data"}), 400


@chart.route("/yaml", methods=["POST"])
def generate_chart_from_yaml():
    if request.method != "POST":
        return jsonify({"error": "Method Not Allowed"}), 405

    files = request.files
    form = request.form
    zoom = bool(form.get("zoom", False))

    # Default network, in case no graphml file is provided
    N = 10**4
    G = nx.barabasi_albert_graph(N, 4)

    graphml_file = files.get("graphml")
    if graphml_file:
        G = nx.read_graphml(graphml_file)

    yaml_file = files.get("yaml")
    if not yaml_file:
        return jsonify({"error": "No file provided"}), 400

    yaml_file_content = yaml_file.read()

    try:
        data = yaml.safe_load(yaml_file_content)

        if data:
            # Get and parse data
            algorithm = data["algorithm"]
            model = data["model"]
            model_function = epidemic_algorithms[algorithm][model]

            states = list(data["states"])
            iterations = int(data["iterations"])

            # Exclude already extracted data (e.g., algorithm choice, model choice, zoom, states, iterations)
            # Keep only the parameters relevant to the desired algorithm, converting them to float if needed
            excluded_keys = ["graphml", "algorithm", "model", "zoom", "states", "iterations"]
            algorithm_parameters = {key: float(value) for key, value in data.items() if key not in excluded_keys}

            model_data = get_model_data(G, model_function, states, iterations, zoom, **algorithm_parameters)

            return jsonify({"positions": model_data})
    except yaml.YAMLError as e:
        return jsonify({"error": "Invalid YAML file: " + str(e)}), 400


@chart.route("/sim", methods=["POST"])
def generate_chart_from_sim():
    if request.method != "POST":
        return jsonify({"error": "Method Not Allowed"}), 405

    files = request.files
    form = request.form

    sim_file = files["simulation_object"]
    if not sim_file:
        return jsonify({"error": "No simulation object file provided"}), 400

    zoom = bool(form.get("zoom", False))
    states = list(form["states"])
    print(states)

    try:
        sim: Simulation_Investigation = dill.load(sim_file)
        if sim:
            model_data = get_model_data_from_sim(sim, states, zoom)
            return jsonify({"inputs": {"zoom": zoom}, "positions": model_data})
        else:
            return jsonify({"error": "Invalid Simulation object file"})
    except:
        return jsonify({"error": "Invalid file format or not a valid simulation object"}), 400
