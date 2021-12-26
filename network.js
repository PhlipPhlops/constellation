function Network(displayConfig) {
    this.root = null // also though of as roots for traversal
    this.nodes = []
    this.neighborField = new NeighborField(100, 100)
    this.numNodes = 500;

    this.connect = () => {
        // Connect every node in the network to its nearest neighbor
        let nodes = this.nodes
        
        for (let i = 0; i < this.nodes.length; i++) {
            let fromN = this.nodes[i]
            this.neighborField.replaceOnMap(fromN)

            let neighbors = this.neighborField.kNearestNeighbors(fromN, fromN.k)
            fromN.neighbors = neighbors
        }
    }

    this.spawn = () => {
        // For now gene is number of nodes in network
        for (let i = 0; i < this.numNodes; i++) {
            this.nodes.push(new Node(displayConfig))
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
            // this.neighborField.consoleTable()
            // console.log(frameRate())
        }
        frameCounter++
    }

}