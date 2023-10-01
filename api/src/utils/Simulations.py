import EoN
import networkx as nx
from simplification.cutil import simplify_coords

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


def run_strategy(model, strategy, label, G, tau, gamma, rho, tmax):
    strategies = []

    if model == "sir":
        t, S, I, R = strategy(G, tau, gamma, rho=rho, tmax=tmax)
    else:
        t, S, I = strategy(G, tau, gamma, rho=rho, tmax=tmax)

    points = [[ti, Ii] for ti, Ii in zip(t.tolist(), I.tolist())]
    strategies.extend([{"strategy": label, "x": x, "y": y} for [x, y] in points])

    return strategies


def run_simulations(model, iterations, G, tau, gamma, rho, tmax):
    simulations = []
    for i in range(iterations):
        if model == "sir":
            t, S, I, R = EoN.fast_SIR(G, tau, gamma, rho=rho, tmax=tmax)
        else:
            t, S, I = EoN.fast_SIS(G, tau, gamma, rho=rho, tmax=tmax)

        points = [[ti, Ii] for ti, Ii in zip(t.tolist(), I.tolist())]
        simplified_data = simplify_coords(points, 0.05)

        simulations.extend([{"strategy": f"Simulation{i + 1}", "x": x, "y": y} for [x, y] in simplified_data])

    return simulations


def get_model_data(model: str, tau: float, gamma: float, rho: float):
    N = 10**5 if model == "sir" else 10**4
    G = nx.barabasi_albert_graph(N, 5)  # create a Barabasi-Albert graph

    tmax = 20
    iterations = 5  # run 5 simulations

    data = []

    # Add simulations
    simulations = run_simulations(model, iterations, G, tau, gamma, rho, tmax)
    data.extend(simulations)

    # Add strategies
    strategies = model_strategies[model]
    for label, strategy in strategies.items():
        data.extend(run_strategy(model, strategy, label, G, tau, gamma, rho, tmax))

    return data
