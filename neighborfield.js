function NeighborField(fw, fh) {
  // Tool used for quicker node-neighbor lookup
  // Field of size fieldWidth by fieldHeight
  //
  this.field = Array(fh).fill(Array(fw).fill(new Array()))

  this.consoleTable = function() {
    console.table(this.field)
  }

  this.getHash = function(node) {
    let mx = floor((node.x / WIDTH) * fw)
    let my = floor((node.y / HEIGHT) * fh)
    return [mx, my]
  }

  this._getGridcell = function(node) {
    // returns array of cells at that node
    let mi = this.getHash(node)
    let mx = mi[0]
    let my = mi[1]
    return this.field[my][mx]
  }

  this._placeOnMap = function(node) {
    let cell = this._getGridcell(node)
    cell.push(node)

  }

  this._removeFromMap = function(node) {
    // Brain fried: make sure you're removing previousHash, not current hash, from map


    let cell = this._getGridcell(node)
    let ind = cell.indexOf(node)
    if (ind !== -1) {
      cell.splice(ind, 1)
    }
  }

  this.replaceOnMap = function(node) {
    // this._removeFromMap(node)
    this._placeOnMap(node)
  }

  this.lookForNeighbors = function(node, k) {
    return []
  }
}