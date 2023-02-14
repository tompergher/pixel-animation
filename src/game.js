import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import TileRegistry from "./tile_registry.js"


export default class Game {

  static map = new Map("maps/map.txt")
  static player = null;

  constructor() {
    this.tileSize = 32
    this.canvas = document.querySelector("#canvas")
    this.canvas.width = 10 * this.tileSize
    this.canvas.height = 15 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    this.camera = new Camera(this)
  }

  gameLoop() {
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    TileRegistry.updateAllTiles()
    CollisionDetector.checkCollision("all")

    this.camera.centerObject(Game.player)

    TileRegistry.drawAllTiles(this.ctx)
  }
}