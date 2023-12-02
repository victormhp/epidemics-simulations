from EoN import Simulation_Investigation
from simplification.cutil import simplify_coords
from src.config.algorithms import EpidemicAlgorithm


def get_model_data(
    G,
    model_function: EpidemicAlgorithm,
    states: list[str],
    iterations: int,
    zoom: bool,
    **kwargs,
) -> list[dict[str, str | float]]:
    data = []

    for i in range(iterations):
        sim = model_function(G, **kwargs, return_full_data=True)

        t, D = sim.summary()

        for key, values in D.items():
            if key in states:
                points = [[ti, ki] for ti, ki in zip(t.tolist(), values.tolist())]

                if zoom:
                    points = simplify_coords(points, 0.05)

                data.extend([{"strategy": f"Simulation {key} - {i + 1}", "x": x, "y": y} for [x, y] in points])

    return data


def get_model_data_from_sim(sim: Simulation_Investigation, states: list[str], zoom: bool) -> list[dict[str, str | float]]:
    data = []
    t, D = sim.summary()

    for key, values in D.items():
        if key in states:
            points = [[ti, ki] for ti, ki in zip(t.tolist(), values.tolist())]

            if zoom:
                points = simplify_coords(points, 0.05)

            data.extend([{"strategy": f"Simulation {key}", "x": x, "y": y} for [x, y] in points])

    return data
