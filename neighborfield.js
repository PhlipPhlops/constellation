function NeighborField(fw, fh) {
  // Tool used for quicker node-neighbor lookup
  // Field of size fieldWidth by fieldHeight
  
  // Fill field cells with empty Sets
  // BE CAREFUL WITH THESE COORDINATES
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

  this._placeOnMap = function(node) {
    let mx = floor((node.x / WIDTH) * fw)
    let my = floor((node.y / HEIGHT) * fh)
    this.lookupLastPos[node.tag] = [my, mx]

    let cell = this.field[my][mx]
    cell.add(node)

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
    cell.delete(node)
  }

  this.replaceOnMap = function(node) {
    this._removeFromMap(node)
    this._placeOnMap(node)
  }

  this.kNearestNeighbors = function(node, k) {
    // CONSIDER: worst case for rastor lookup
    // is no neighbors on the map
    let neighbors = []

    // bring field into scope
    let field = this.field

    // Grab the current node position
    let cellPos = this.lookupLastPos[node.tag]
    let my = cellPos[0]
    let mx = cellPos[1]

    let layer = 0 // Layer will increment for every rastor lookup
                  // up to (incl.) half the highest dimension (fh or fw)
    // First find the smallest layer with >k nodes in the field

    function getSubMap(my, mx, layer) {
      // Grab coords (and handle edge detection)
      // top - t, bottom - b, left - l, right -r
      let lx = mx - layer
      if (lx < 0) lx = 0
      let rx = mx + layer
      if (rx >= fw) rx = fw - 1

      let ty = my - layer
      if (ty < 0) ty = 0
      let by = my + layer
      if (by >= fh) by = fh - 1

      return field.slice(ty, by+1).map(row => row.slice(lx, rx+1))
    }

    let count = 0
    // Watch these while loop stopping points; responsible for speed
    while (count < k+1 && layer <= (max(fh,fw) / 2)) {
      // Recounts on every layer lookup
      count = 0

      let twoDslice = getSubMap(my, mx, layer)
      
      // Now count available nodes
      // Remember the current node is always in this slice
      for (let i = 0; i < twoDslice.length; i++) {
        let row = twoDslice[i]
        for (let j = 0; j < row.length; j++) {
          let cell = twoDslice[i][j]
          count += cell.size
        }
      }
      layer++
    }

    // Now that you have the appropriate layer value, add all cells in that slice to an array
    let twoDslice = getSubMap(my, mx, layer)
    // Now add available nodes to a list
    for (let i = 0; i < twoDslice.length; i++) {
      let row = twoDslice[i]
      for (let j = 0; j < row.length; j++) {
        let cell = twoDslice[i][j]
        neighbors.push(...cell)
      }
    }

    // Finally, sort the potential neighbors and return the first k of them
    let x = node.x;
    let y = node.y;
    neighbors.sort(function(a, b) {
        let dista = sqrt(Math.pow(a.x - x, 2) + Math.pow(a.y - y, 2))
        let distb = sqrt(Math.pow(b.x - x, 2) + Math.pow(b.y - y, 2))
        return dista - distb
    })
    
    return neighbors.slice(1, k+1)
  }
}