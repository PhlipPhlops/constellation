let HEIGHT = 812 * 4
let WIDTH = 375 * 4

let network = new Network()

function setup() {
  createCanvas(WIDTH, HEIGHT);
  network.spawn()
}

function draw() {
  background(0);

  network.update()
  network.show()
}