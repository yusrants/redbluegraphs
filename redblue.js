class Graph {
    constructor() {

        // Graph is an adjacency list i.e for each node, there's a list that contains all it's adjacent nodes
        this.graph = {};
        this.nodes = [];
        this.colored = [];
        this.is_redblue = true;
        this.is_connected = true;
        this.result = "";
    }

    addNode (a,b) {
        
        // if "a" is already present in the graph, push "b" to its list
        if (this.graph[a]) {
            if (this.graph[a].indexOf(b) === -1)
                    this.graph[a].push(b);
        }
        
        /* If the key "a" is not there in the graph, add a with a list as its property
        And add "b" to the "a" list */
        else {
            this.graph[a] = [];
            this.graph[a].push(b)
        }
                
    }
    
    addEdge(a,b) {
        
        // As a and b are the respective nodes of the edge, add "a" to "b" list and "b" to "a" list
        this.addNode(a,b);
        this.addNode(b,a);
    }

    getEdge(path) {
        const edges = path.split("-");
        
        // For a single node, add an empty list
        if(edges.length === 1)
        {
            this.graph[edges[0]] = [];
        }

        // Call addEdge for each edge:
        else {
            for ( let i=0; i < edges.length - 1; i++) {
                this.addEdge(edges[i],edges[i+1]);
            }
        }
    }

    getPaths(str) {
        // Replace consecutive dashes by a single dash
        str = str.replace(/-+/g, '-');

        // Replace all new line characters, more than 1 consecutive commas with a single comma (,) then remove all extra spaces
        str = str.replace(/,\n+/g, ',').replace(/,+/g, ',').replace(/\s/g,'');
        
        // Extract paths on the basis of comma (,) 
        const paths = str.split(",");

        // For each path, extract edges
        paths.forEach(path => {
            this.getEdge(path);
        });
    }

    setNodes() {
        this.nodes = Object.keys(this.graph);
        this.colored = new Array(this.nodes.length).fill(false);
    }

    dfs(graph) {

        this.getPaths(graph);
        this.setNodes();

        const visited = [];
        const start = 0;

        let node = this.nodes[start];

        // Let's assume 1 is for red and 2 for blue
        // Mark the first visited node as 1 i.e red color
        this.colored[start] = 1

        // Push the first visited node to the visited stack
        visited.push(this.nodes[0]);
        
        while (visited.length)
        {   
            // Get the latest node from the visited stack
            node = visited.pop();

            // Find out its index
            const current = this.nodes.indexOf(node);

            // Get the list of adjacent nodes
            const adjacent_nodes = this.graph[node];

            // Visit each adjacent node and color it the opposite color to the current node
            adjacent_nodes.forEach(node => 
                {
                    const index = this.nodes.indexOf(node);

                    // Coloring the current adjacent node with opposite color
                    if (!this.colored[index]) {
                        this.colored[index] = 3 - this.colored[current];
                        visited.push(this.nodes[index]);
                    }
                    else {
                        // If the current adjacent node is already colored, make sure it's of opposite color
                        const color = this.colored[index];
                        if (color !== (3 - this.colored[current]))
                        {
                            // If the current adjacent node is not of opposite color, the graph is not red-blue colorable
                            this.is_redblue = false;
                            return;
                        }
                    }
                })
        }

        this.isConnected();
    }

    isConnected() {

        this.colored.forEach(node=>{
            if(!node){
                this.is_connected = false;
            }
        })
    }

    isRedBlue (graph) {

        this.dfs(graph);

        // Results
        if (this.is_connected && this.is_redblue) {
            this.result = "The graph is connected and red-blue colorable!";
        }
        else if (!this.is_connected) {
            this.result ="The graph is not connected!";
        }
        else {
            this.result = "The graph is connected but not red-blue colorable!";
        }
    }
}


const findGraph = () => {
    event.preventDefault();
    const input = document.getElementById("graphInput").value;
    const output = document.getElementById("result");
    const graph = new Graph();
    graph.isRedBlue(input);
    output.innerHTML = graph.result;
}
