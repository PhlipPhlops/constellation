function Network() {
    this.root = null // also though of as roots for traversal
    this.nodes = []
    this.neighborField = new NeighborField(3, 3)
    // this.edges = {
    //     // Designed to be called edgeMap.from['node1'].to['node2'] <- {data}
    //     'from': {

    //     }
    // }
    // this.seenEdges = {
    //     'from': {

    //     }
    // }

    // Config
    this.numNodes = 3;

    this.connect = () => {
        // Connect every node in the network to its nearest neighbor
        let nodes = this.nodes
        let kNearestNeighbors = (node, k) => {
            let x = node.x;
            let y = node.y;
            nodes.sort(function(a, b) {
                let dista = sqrt(Math.pow(a.x - x, 2) + Math.pow(a.y - y, 2))
                let distb = sqrt(Math.pow(b.x - x, 2) + Math.pow(b.y - y, 2))
                return dista - distb
            })
            return this.nodes.slice(1, k+1)
        }
        
        for (let i = 0; i < this.nodes.length; i++) {
            let fromN = this.nodes[i]
            this.neighborField.replaceOnMap(fromN)
            
            let neighbors = kNearestNeighbors(fromN, fromN.k)
            fromN.neighbors = neighbors

            // let neighbors = nieghbordField.kNearestNeighbors(fromN, fromN.k)
            // fromN.neighbors = neighbors
        }
    }

    this.spawn = () => {
        // For now gene is number of nodes in network
        for (let i = 0; i < this.numNodes; i++) {
            this.nodes.push(new Node())
        }
    }

    this.update = () => {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].update()
        }
        this.connect()
    }

    let frameCounter = 0
    this.show = () => {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].show()
        }


        // Runs ~once per second
        if (frameCounter % 60 == 0) {
            this.neighborField.consoleTable()
        }
        frameCounter++
    }

}