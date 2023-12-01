import EoN
import networkx as nx
from EoN import Simulation_Investigation
from simplification.cutil import simplify_coords
from numpy.typing import NDArray
from typing import Any, Callable


model_strategies: dict[str, dict[str, Callable[..., tuple]]] = {
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


def get_model_data(G, model_function, zoom: bool, states: list[str], tau: float, gamma: float, rho: float) -> list[dict[str, str | float]]:
    tmax = 20
    iterations = 5  # run 5 simulations

    data = []

    # Add simulations
    simulations = run_simulations(
        G,
        model_function,
        zoom,
        states,
        iterations,
        tau,
        gamma,
        rho,
        tmax,
    )

    data.extend(simulations)

    # Add strategies
    # strategies = model_strategies[model]
    # for label, strategy in strategies.items():
    #     data.extend(run_strategy(model, strategy, label, G, tau, gamma, rho, tmax))

    return data


def get_model_data_from_sim(t: NDArray, D: dict[Any, NDArray], zoom: bool) -> list[dict[str, str | float]]:
    data = []

    for key, values in D.items():
        points = [[ti, ki] for ti, ki in zip(t.tolist(), values.tolist())]
        print(points)

        if zoom:
            points = simplify_coords(points, 0.05)

        data.extend([{"strategy": f"Simulation: {key}", "x": x, "y": y} for [x, y] in points])

    return data


def run_simulations(
    G,
    model_function,
    zoom: bool,
    states: list[str],
    iterations: int,
    tau: float,
    gamma: float,
    rho: float,
    tmax: float,
) -> list[dict[str, str | float]]:
    simulations = []

    for i in range(iterations):
        sim_object = model_function(G, tau, gamma, rho=rho, tmax=tmax, return_full_data=True)

        t, D = sim_object.summary()

        for key, values in D.items():
            if key in states:
                points = [[ti, ki] for ti, ki in zip(t.tolist(), values.tolist())]

                if zoom:
                    points = simplify_coords(points, 0.05)

                simulations.extend([{"strategy": f"Simulation {key} - {i + 1}", "x": x, "y": y} for [x, y] in points])

    return simulations


def run_strategy(
    model: str,
    strategy_function: Callable[..., tuple],
    label: str,
    G: type[nx.Graph],
    tau: float,
    gamma: float,
    rho: float,
    tmax: float,
) -> list[dict[str, str | float]]:
    strategies = []

    if model == "sir":
        t, S, I, R = strategy_function(G, tau, gamma, rho=rho, tmax=tmax)
    else:
        t, S, I = strategy_function(G, tau, gamma, rho=rho, tmax=tmax)

    points = [[ti, Ii] for ti, Ii in zip(t.tolist(), I.tolist())]
    strategies.extend([{"strategy": label, "x": x, "y": y} for [x, y] in points])

    return strategies
