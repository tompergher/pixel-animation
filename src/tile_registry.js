export default class TileRegistry {
  static instance = null
  static layers = {
      background: [],
      item: [],
      player: [],
      world: [],
    }

  static getInstance() {
    if (TileRegistry.instance == null) {
      TileRegistry.instance = TileRegistry.createInstance()
    }
    return TileRegistry.instance
  }

  static createInstance() {
    let object = new TileRegistry()
    return object
  }

  static drawAllTiles(ctx) {
    Object.entries(TileRegistry.layers).forEach(([_, layer]) => {
      layer.forEach(tile => {
        tile.draw(ctx)
      })
    })
  }

  static updateAllTiles() {
    Object.entries(TileRegistry.layers).forEach(([_, layer]) => {
      layer.forEach(tile => {
        tile.update()
      })
    })
  }
}