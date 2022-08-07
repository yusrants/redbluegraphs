# Red-Blue Colorable Graphs

A graph is red blue colorable if two connected nodes have
never the same color and the graph is a connected graph. A
user should be able to enter a graph in a textarea by typing
some paths (a word is a node, a dash an edge and a new
line or a comma a separ ation between paths)

### Some examples
 #### Input: a b c
Is a connected and red blue colorable graph
#### Input: a b, f g
Is not a connected grap h
#### Input: a b c a
Is a connected graph, but not red blue colorable
#### Input: a b, c d, b c, a d
Is a connected and red blue colorable graph

## Solution

### Step 1: Extract paths and edges
Take user input in the form of a single string and extract paths from it.
In order to extract paths, first of all replace all "," and "\n" with a single comma. 
Also, remove any extra space between the characters. For examople: "node no. 1" will be transformed into "nodeno.1" and treated as a single node.
````
node1--node2
node2-node3
node4----node5
````
will be transformed into:
````
node1-node2,node2-node3,node4-node5
````