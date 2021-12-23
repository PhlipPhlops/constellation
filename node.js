function Node() {
  this.x = floor(Math.random() * WIDTH)
  this.y = floor(Math.random() * HEIGHT)
  this.pos = createVector(this.x, this.y)
  this.tag = `${this.x},${this.y}`
  this.vel = createVector(Math.random(-1,1), Math.random(-1,1))
  this.k = floor(Math.random() * 6) + 2
  
  this.neighbors = [];
  this.prevHash = neighborField.getHash(this)
  
  this.kNearestNeighbors = (k) => {
    let x = this.x;
    let y = this.y;
    nodes.sort(function(a, b) {
      let dista = sqrt(Math.pow(a.x - x, 2) + Math.pow(a.y - y, 2))
      let distb = sqrt(Math.pow(b.x - x, 2) + Math.pow(b.y - y, 2))
      return dista - distb
    })
    
    return nodes.slice(1,k+1)
  }
  
  this.connect = () => {
    this.neighbors = this.kNearestNeighbors(this.k)
    // this.neighbors = neighborField.lookForNeighbors(this, this.k)
  }
  
  this.update = () => {
    // Random vel
    // this.vel = createVector(Math.random(-10,10), Math.random(-10,10))
    this.x += this.vel.x
    this.y += this.vel.y
    
    if (this.x > WIDTH) this.x = 0;
    if (this.y > HEIGHT) this.y = 0;
    if (this.x < 0) this.x = WIDTH;
    if (this.y < 0) this.y = HEIGHT;
    this.pos = createVector(this.x, this.y)

    neighborField.replaceOnMap(this)
    
    this.connect()
  }
  
  this.show = () => {
    stroke(255, 16, 240)
    strokeWeight(1)
    // draw line between here and neighbor
    for (let i = 0; i < this.neighbors.length; i++) {
      line(this.x, this.y, this.neighbors[i].x, this.neighbors[i].y)
    }

    // Draw point after neihgbor lines to draw on top
    stroke(4, 255, 247)
    strokeWeight(4)
    point(this.pos)
  }
}