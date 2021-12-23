function Node(tag) {
  this.tag = tag
  this.x = floor(Math.random() * WIDTH)
  this.y = floor(Math.random() * HEIGHT)
  this.vel = createVector(Math.random(-1,1), Math.random(-1,1))
  this.k = floor(Math.random() * 6) + 2
  
  this.neighbors = [];
  
  this.update = () => {
    // Random vel
    this.x += this.vel.x
    this.y += this.vel.y
    
    if (this.x > WIDTH) this.x = 0;
    if (this.y > HEIGHT) this.y = 0;
    if (this.x < 0) this.x = WIDTH;
    if (this.y < 0) this.y = HEIGHT;
  }
  
  this.show = () => {
    stroke(255, 16, 240)
    strokeWeight(4)
    // draw line between here and neighbor
    for (let i = 0; i < this.neighbors.length; i++) {
      line(this.x, this.y, this.neighbors[i].x, this.neighbors[i].y)
    }

    // Draw point after neihgbor lines to draw on top
    stroke(4, 255, 247)
    strokeWeight(16)
    point(createVector(this.x, this.y))
  }
}