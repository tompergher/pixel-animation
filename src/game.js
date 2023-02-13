import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"

export class TileRegistry {
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



export default class Game {

  static CD = new CollisionDetector()
  static map = new Map("maps/map.txt")
  static TileRegistry;
  static player = null;

  constructor() {
    this.tileSize = 32
    this.canvas = document.querySelector("#canvas")
    this.canvas.width = 10 * this.tileSize
    this.canvas.height = 15 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false
    Game.TileRegistry = TileRegistry.getInstance()

    this.camera = new Camera(this)

  }

  gameLoop() {
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    TileRegistry.updateAllTiles()
    Game.CD.checkCollision("all")

    this.camera.centerObject(Game.player)

    TileRegistry.drawAllTiles(this.ctx)
  }
}