import EoN
import networkx as nx
from EoN import Simulation_Investigation
from simplification.cutil import simplify_coords
from typing import List

model_strategies = {
    "sir": {
        "Homogeneous pairwise": EoN.SIR_homogeneous_pairwise_from_graph,
        "Heterogeneous meanfield": EoN.SIR_heterogeneous_meanfield_from_graph,
        "EBCM approximation": EoN.EBCM_from_graph,
        "Prefix mix EBCM": EoN.EBCM_pref_mix_from_graph,
    },
    "sis": {
        "Homogeneous pairwise": EoN.SIS_homogeneous_pairwise_from_graph,
        "Heterogeneous meanfield": EoN.SIS_heterogeneous_meanfield_from_graph,
        "Compact Pairwise": EoN.SIS_compact_pairwise_from_graph,
    },
}

model_simulations = {
    "sir": EoN.fast_SIR,
    "sis": EoN.fast_SIS,
    "nonMarkovSir": EoN.fast_nonMarkov_SIR
}


def run_strategy(model, strategy, label, G, tau, gamma, rho, tmax):
    strategies = []

    if model == "sir":
        t, S, I, R = strategy(G, tau, gamma, rho=rho, tmax=tmax)
    else:
        t, S, I = strategy(G, tau, gamma, rho=rho, tmax=tmax)

    points = [[ti, Ii] for ti, Ii in zip(t.tolist(), I.tolist())]
    strategies.extend([{"strategy": label, "x": x, "y": y} for [x, y] in points])

    return strategies


def run_simulations(model, states, iterations, G, tau, gamma, rho, tmax, zoom):
    simulations = []
    model = model_simulations[model]

    for i in range(iterations):
        sim_object: Simulation_Investigation = model(G, tau, gamma, rho=rho, tmax=tmax, return_full_data=True)
        t, D = sim_object.summary()

        for key, values in D.items():
            if key in states:
                points = [[ti, ki] for ti, ki in zip(t.tolist(), values.tolist())]
            
                if zoom:
                    points = simplify_coords(points, 0.05)
            
                simulations.extend([{"strategy": f"Simulation {key} - {i + 1}", "x": x, "y": y} for [x, y] in points])

    return simulations


def get_model_data(model: str, states: List[str], tau: float, gamma: float, rho: float, zoom: bool):
    N = 10**5 if model == "sir" else 10**4
    G = nx.barabasi_albert_graph(N, 5)  # create a Barabasi-Albert graph

    tmax = 20
    iterations = 5  # run 5 simulations

    data = []

    # Add simulations
    simulations = run_simulations(model, states, iterations, G, tau, gamma, rho, tmax, zoom)
    data.extend(simulations)

    # Add strategies
    strategies = model_strategies[model]
    for label, strategy in strategies.items():
        data.extend(run_strategy(model, strategy, label, G, tau, gamma, rho, tmax))

    return data


def get_model_data_from_sim(t, D):
    data = []

    for key, values in D.items():
        points = [[ti, ki] for ti, ki in zip(t.tolist(), values.tolist())]
        simplified_data = simplify_coords(points, 0.05)

        data.extend([{"strategy": f"Simulation: {key}", "x": x, "y": y} for [x, y] in simplified_data])

    return data
