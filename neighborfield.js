function NeighborField(fw, fh) {
  // Tool used for quicker node-neighbor lookup
  // Field of size fieldWidth by fieldHeight
  
  // Fill field cells with empty Sets
  // Lookup  y, x  in that order
  this.field = Array(fh)
  for (let y = 0; y < fh; y++) {
    this.field[y] = Array(fw)
    for (let x = 0; x < fw; x++) {
      this.field[y][x] = new Set()
    }
  }

  // Hashmap with key: node tag and value: last known position
  this.lookupLastPos = {}

  this.consoleTable = function() {
    console.table(this.field)
  }

  this._getGridcell = function(node) {
    // returns array of cells at that node
    let mx = floor((node.x / WIDTH) * fw)
    let my = floor((node.y / HEIGHT) * fh)
    return this.field[my][mx]
  }

  this._placeOnMap = function(node) {
    let mx = floor((node.x / WIDTH) * fw)
    let my = floor((node.y / HEIGHT) * fh)
    this.lookupLastPos[node.tag] = [my, mx]

    let cell = this.field[my][mx]
    cell.add(node.tag)

  }

  this._removeFromMap = function(node) {
    let cellPos = this.lookupLastPos[node.tag]
    if (!cellPos) {
      // Not registered in cell map, nothing to remove
      return
    }

    let my = cellPos[0]
    let mx = cellPos[1]
    let cell = this.field[my][mx]
    cell.delete(node.tag)
  }

  this.replaceOnMap = function(node) {
    this._removeFromMap(node)
    this._placeOnMap(node)
  }

  this.lookForNeighbors = function(node, k) {
    return []
  }
}