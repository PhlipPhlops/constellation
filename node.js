let topSpeed = 10

/* displayConfig {
    edgeColor: [r, g, b],
    nodeColor: [r, g, b]

  }
*/

function Node(displayConfig) {
  this.tag = makeNodeId()
  this.x = floor(Math.random() * WIDTH)
  this.y = floor(Math.random() * HEIGHT)
  this.vel = createVector((Math.random() - 0.5) * topSpeed, (Math.random() - 0.5) * topSpeed)
  this.k = floor(Math.random() * 6) + 2
  
  this.neighbors = [];
  
  this.update = () => {
    return
    // Random vel
    // this.vel = createVector((Math.random() - 0.5) * topSpeed, (Math.random() - 0.5) * topSpeed)
    this.x += this.vel.x
    this.y += this.vel.y
    
    if (this.x > WIDTH) this.x = 0;
    if (this.y > HEIGHT) this.y = 0;
    if (this.x < 0) this.x = WIDTH - 1;
    if (this.y < 0) this.y = HEIGHT - 1;
  }
  
  this.show = () => {
    let ec = displayConfig['edgeColor']
    stroke(ec[0], ec[1], ec[2])
    strokeWeight(4)
    // draw line between here and neighbor
    for (let i = 0; i < this.neighbors.length; i++) {
      line(this.x, this.y, this.neighbors[i].x, this.neighbors[i].y)
    }

    // Draw point after neihgbor lines to draw on top
    let nc = displayConfig['nodeColor']
    stroke(nc[0], nc[1], nc[2])
    strokeWeight(16)
    point(createVector(this.x, this.y))
  }
}

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
