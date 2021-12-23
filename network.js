function makeNodeId() {
    // Returns random 6 char string
    let length = 6
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


function Network() {
    this.root = null // also though of as roots for traversal
    this.nodes = []
    this.edges = {
        // Designed to be called edgeMap.from['node1'].to['node2'] <- {data}
        'from': {

        }
    }
    this.seenEdges = {
        'from': {

        }
    }

    // Config
    this.numNodes = 100;

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
            let k = floor(Math.random() * 4) + 1
            
            let neighbors = kNearestNeighbors(fromN, k)
            fromN.neighbors = neighbors
        }
    }

    this.spawn = () => {
        // For now gene is number of nodes in network
        for (let i = 0; i < this.numNodes; i++) {
            let node = new Node(makeNodeId());
            this.nodes.push(node)
        }
    }

    this.update = () => {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].update()
        }
        this.connect()
    }

    this.show = () => {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].show()
        }
    }

}