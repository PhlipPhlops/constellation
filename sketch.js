let HEIGHT = 800
let WIDTH = 800

this.nodes = [];
this.neighbors = {};
this.numNodes = 50;

let neighborField = new NeighborField(10, 10)

function setup() {
  createCanvas(WIDTH, HEIGHT);
  neighborField.consoleTable()

  
  for (let i = 0; i < numNodes; i++) {
    let node = new Node();
    nodes.push(node)
  }
  
  for (let i = 0; i < numNodes; i++) {
    nodes[i].connect()
  }
}

function draw() {
  background(0);
  
  for (let i = 0; i < numNodes; i++) {
    nodes[i].update()
    nodes[i].show()
  }
  neighborField.consoleTable()
}