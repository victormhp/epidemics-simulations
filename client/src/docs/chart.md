---
title: How to run a simulation?
subtitle: Generate Chart
description: How to generate a chart?.
---

## Upload your network

Facilitate simulations by generating your network using GraphML. If you have a specific GraphML file for your network, you can upload it for simulations; otherwise, a default network will be used.

The following example shows how to create and visualize a GraphML file using the NetworkX library in Python.

```python
import networkx as nx
import matplotlib.pyplot as plt

# Create a graph
G = nx.complete_graph(20)

# Write graphml file
nx.write_graphml(G, "test.graphml")

# Plot the network
pos = nx.spring_layout(G)  # You can use different layout algorithms
nx.draw(G,
        pos,
        with_labels=True,
        font_weight='bold',
        node_color='skyblue',
        node_size=800,
        font_size=10,
        edge_color='gray')

# Show the plot
plt.show()
```

## Form Data

Create a chart by entering the required information in the form. Currently, there are a few limitations in the system. You have the freedom to choose the algorithm and model from EoN, except for those that require custom functions as parameters.
![EoN Form](/images/eon-form.webp)

### Zoom

To enable zoom and panning funcionality in the graph the user will need to mark the checkbox in the form. Behind the scenes, an algorithm is applied to smooth polylines. This is particularly useful for simulations involving extensive data, where these features might result in a worse user experience.

Please note that this may **not be recommended** if perfect accuracy is required.

## Yaml

In addition, uou have the option to create a chart by uploading a YAML file. Once the chart is generated, you can download the inputs as a YAML file. This feature is designed to make storing your charts easier.

![EoN Yaml Form](/images/eon-yaml.webp)

## Simulation Investigation Object

If you need to generate a chart using algorithms that are not displayed in the default form, you can upload a serialized Simulation Investigation Object from the EoN module.

![EoN Simulation Object Form](/images/eon-sim.webp)

The following example shows how to serialized a Simulation Investigation Object using dill. The examples uses dill because pickle can show several problems when trying to serialized lambdas.

```python
import networkx as nx
import EoN
import dill

N=10**5
G=nx.barabasi_albert_graph(N, 5) #create a barabasi-albert graph

tmax = 20
iterations = 5  #run 5 simulations
tau = 0.1           #transmission rate
gamma = 1.0    #recovery rate
rho = 0.005      #random fraction initially infected

sim = EoN.fast_SIR(G, tau, gamma, rho=rho, tmax = tmax, return_full_data=True)

# Save the sim object to a file using dill
with open('sim_data.dill', 'wb') as file:
    dill.dump(sim, file)

print("Sim object has been saved to 'sim_data.dill'")

```
