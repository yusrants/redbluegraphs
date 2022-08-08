# Red-Blue Colorable Graphs

A graph is red blue colorable if two connected nodes have
never the same color and the graph is a connected graph. 
**Input: a-b-c**
Is a connected and red blue colorable graph
**Input: a-b, f-g**
Is not a connected graph
**Input: a-b-c-a**
Is a connected graph, but not red blue colorable
**Input: a-b, c-d, b-c, a-d**
Is a connected and red blue colorable graph

## Solution

### Step 1: Extracting paths
* Take user input in the form of a single string and extract paths from it.
* In order to extract paths, first of all replace all "\n" with a single comma.
* Replace consecutives dashes (---) for edges with a single "-", for consecutive processing for edges. 
* Next, remove any extra space between the characters. 
##### For examople: 
````
" node no. 1 " 
````
will be transformed into 
````
"nodeno.1" 
````
and treated as a single node.
````
node1--node2
node2-node3
node4----node5
````
will be transformed into:
````
node1-node2,node2-node3,node4-node5
````
* The next step is separating paths by splitting the string on the basis of ","
* As a result, we get an array of paths.
### Step 2: Extracting Edges and Nodes
* The next step is extracting edges from paths.
* First, we call the getEdge() function for each path.
* In getEdge() function, we split the edges on the basis of "-" and extract the two nodes for each edge.
````
a-b-c-d => [a,b,c,d]
````
* For two consecutive nodes per edge, we call the addEdge() function that adds the two nodes for the respective edge to the graph. The addEdge is called n-1 times where n is the length of the array. For example, in this case the length would be 4 and we'll call addEdge() 3 times. 
````
addEdge(a,b)
addEdge(b,c)
addEdge(c,d) 
````
* The addEdge() function calls the addNode() function that adds the first node to the second node's list in the graph and add the second node to the first node's list.
* In this way, we extract nodes and finally add them to the graph.
* As a result, we have a graph in the following form:
````
{ 
    a: [b],
    b: [a,c],
    c: [b,d],
    d: [c]
}
````
### Step 3: Setting the *nodes* and  *colored* array
* After we get a complete graph containing the adjacency list of the nodes, the next step is to do a depth-first search of the graph and find out if it's connected and red-blue colorable or not.
* The next step is constructing a ***nodes*** array of the array and the respective ***colored*** array.
* Next, we'll extract the graph object keys. The result will give us an array of nodes that contains the nodes against their respective indices. 
* Using this nodes array, we'll fill the ***colored*** array of the same length as the ***nodes*** array and we'll fill it with all *false* values.
For example, the above graph will give us:
````
nodes : [a,b,c,d];
colored: [false,false,false,false]
````
* The  ***colored*** array denotes the color of the respective node index. Each index can have 3 values:
1. *1*: denotes that the node has *red* color.
2. *2*: denotes that the node has *blue* color.
3. *false*: denotes that the node hasn't been visited yet.

### Step 4: Depth-First Search (DFS)
* For DFS, we maintain a visited stack.
* We start by visiting the first node in the nodes array.
* Push the node to the visited stack.
* Mark the node as visited and of *red* color by assigning it value *1* in the colored stack.
* Now while the visited stack is not empty, pop the node from the visited stack.
* Visit each and every node that's adjacent to the node and mark it as the opposite color to the current node color.
* If the current adjacent node is already colored/ visited, check its color and make sure it's oppsoite to the current node color. If that's not the case, the graph is not red-blue colorable, so mark *is_redblue* as *false*.
* Next we call the isConnected() function that checks if there are ANY unvisited elements in the ***colored*** array. If that's the case we mark *is_connected* as false.

### Step 5: Result
* Check both the values *is_connected* and *is_redblue* to make the following conclusions:
    - "The graph is connected and red-blue colorable!"
    - "The graph is not connected!"
    - "The graph is connected but not red-blue colorable!"

