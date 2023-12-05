export const epidemicAlgorithms = {
	eventBased: 'Event Based',
	gillespie: 'Gillespie',
	discreteTime: 'Discrete Time'
};

export const simulationStates = ['S', 'I', 'R'];

export const simulations = {
	eventBased: {
		fastSIR: 'Fast SIR',
		fastSIS: 'Fast SIS'
	},
	gillespie: {
		gillespieSIR: 'Gillespie SIR',
		gillespieSIS: 'Gillespie SIS'
	},
	discreteTime: {
		basicDiscreteSIR: 'Basic Discrete SIR',
		basicDiscreteSIS: 'Basic Discrete SIS'
	}
};
