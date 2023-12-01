import EoN
from EoN import Simulation_Investigation
from typing import Any, Callable

epidemic_algorithms: dict[str, dict[str, Callable[..., tuple | Simulation_Investigation | list[Any]]]] = {
    "eventBased": {
        "fastSIR": EoN.fast_SIR,
        "fastNonMarkovSIR": EoN.fast_nonMarkov_SIR,
        "fastSIS": EoN.fast_SIS,
        "fastNonMarkovSIS": EoN.fast_nonMarkov_SIS,
    },
    "gillespie": {
        "gillespieSIR": EoN.Gillespie_SIR,
        "gillespieSIS": EoN.Gillespie_SIS,
    },
    "discreteTime": {
        "basicDiscreteSIR": EoN.basic_discrete_SIR,
        "basicDiscreteSIS": EoN.basic_discrete_SIS,
        "discreteSIR": EoN.discrete_SIR,
    },
}
