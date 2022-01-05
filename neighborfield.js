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
    // CONSIDER: worst case for rastor lookup is no neighbors on the map
    
    // Bring field into scope
    let field = this.field

    // Grab the current node position
    let cellPos = this.lookupLastPos[node.tag]
    let my = cellPos[0]
    let mx = cellPos[1]

    // Create neighbors and fill with center field
    let neighbors = [...field[my][mx]]

    let layer = 1 // Layer will increment for every rastor lookup
                  // up to (incl.) half the highest dimension (fh or fw)
    // First find the smallest layer with >k nodes in the field

    while (neighbors.length < k+1 && layer <= (max(fh, fw) / 2)) {
      // Grab coords (and handle edge detection)
      // top - t, bottom - b, left - l, right -r
      let lx = mx - layer,
          rx = mx + layer,
          ty = my - layer,
          by = my + layer

      for (let y = ty; y <= by; y++) {

        // Edge detection
        if (y < 0) y = 0 // Jump down to top edge of field
        if (y >= fh) break // y beyond bottom edge of field, stop

        for (let x = lx; x <= rx; x++) {
          
          // Edge detection
          if (x < 0) x = 0 // Jump to left edge of field
          if (x >= fw) break // x beyond right edge of field, stop

          if (y != ty && y != by) {
            // For non top or bottom rows, x only checks two positions
            if (lx >= 0) neighbors.push(...field[y][lx])
            if (rx < fw) neighbors.push(...field[y][rx])
            break
          }
          // Otherwise, check every x in the row
          neighbors.push(...field[y][x])
        }
      }
      layer++
    }

    return neighbors.slice(1, k+1)
  }
}