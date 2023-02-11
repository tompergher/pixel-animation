import { Player } from "./game_objects.js"
import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"

export class TileRegistry {
  static instance = null
  static layers = {
      background: [],
      world: [],
      map: [],
      items: [],
      player: [],
      item: [],
      pickups: []
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
}



export default class Game {

  static CD = new CollisionDetector()
  static map = new Map("maps/map.txt")
  static TileRegistry;

  constructor() {
    this.tileSize = 32
    this.canvas = document.querySelector("#canvas")
    this.canvas.width = 10 * this.tileSize
    this.canvas.height = 15 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false
    Game.TileRegistry = TileRegistry.getInstance()

    this.player = new Player(4, 5)
    this.camera = new Camera(this)

    this.camera.moveToPoint(-1, 2, this.player.tileSize, 60)
  }

  gameLoop() {
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    this.player.update()
    Game.CD.checkCollision("all")

    this.camera.centerObject(this.player)

    TileRegistry.drawAllTiles(this.ctx)
    // Game.map.drawMap(this.ctx)
    // this.player.draw(this.ctx)
  }
}