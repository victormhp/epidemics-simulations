import EoN
from EoN import Simulation_Investigation
from typing import Callable

EpidemicAlgorithm = Callable[..., Simulation_Investigation | tuple | list]

epidemic_algorithms: dict[str, dict[str, EpidemicAlgorithm]] = {
    "eventBased": {
        "fastSIR": EoN.fast_SIR,
        "fastSIS": EoN.fast_SIS,
    },
    "gillespie": {
        "gillespieSIR": EoN.Gillespie_SIR,
        "gillespieSIS": EoN.Gillespie_SIS,
    },
    "discreteTime": {
        "basicDiscreteSIR": EoN.basic_discrete_SIR,
        "basicDiscreteSIS": EoN.basic_discrete_SIS,
    },
}
