let HEIGHT = 812 * 4
let WIDTH = 375 * 4

let networks = [
  // new Network(
  //   {
  //     edgeColor: [255, 16, 240],
  //     nodeColor: [4, 255, 247]
  //   }
  // ),
  new Network(
    {
      edgeColor: [105, 16, 240],
      nodeColor: [255, 4, 247]
    }
  ),
  // new Network(
  //   {
  //     edgeColor: [105, 105, 105],
  //     nodeColor: [255, 4, 247]
  //   }
  // ),
  // new Network(
  //   {
  //     edgeColor: [216, 216, 4],
  //     nodeColor: [255, 4, 247]
  //   }
  // ),
]

function setup() {
  createCanvas(WIDTH, HEIGHT);
  networks.forEach(net => {
    net.spawn()
  })
}

function draw() {
  background(0);

  networks.forEach(net => {
    net.update()
    net.show()
  })

  console.log(floor(frameRate()))
}