import EventHandler, {AnimationHandler, CollisionHandler, GravityHandler, HandlerManager} from "./event_handler.js"
import Game, { TileRegistry } from "./game.js"
import { findAndRemoveFromList } from "./utils.js"

export class GameObject extends EventTarget {
  constructor(x, y, options = {sheet, layer: "background", collisionTags: []}) {
    super()
    this.sheet = options.sheet
    this.tileSize = 32
    this.x = x * this.tileSize
    this.y = y * this.tileSize
    this.col = 0
    this.row = 0
    this.layer = options.layer
    this.handlers = new HandlerManager([])
    TileRegistry.layers[this.layer].push(this)
    this.collisionTags = options.collisionTags
    this.collisionTags.forEach(tag => {
      Game.CD.layers[tag].push(this)
    })
  }

  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y, this.tileSize, this.tileSize
    )
  }

  destroy() {
    findAndRemoveFromList(TileRegistry.layers[this.layer], this)
    this.collisionTags.forEach(tag => {
      findAndRemoveFromList(Game.CD.layers[tag], this)
    })
  }

  update(){
    this.handlers && this.handlers.runAll(this)
  }


}

export class Background extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })

    this.row = 0
    this.col = 0
  }
}

export class Stone extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}

export class FallingStone extends Stone {
  constructor(x, y) {
    super(x, y)
    this.handlers = new HandlerManager([
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1
      }),
      new CollisionHandler()
    ])
  }
  
}

export class Tree extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["forest"]
    })
    this.row = 1
    this.col = 1
  }
}

export class Mushroom extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 2
  }
}

class AnimatedGameObject extends GameObject {
  constructor(x, y, options) {
    super(x, y, options)
    this.frameCounter = 0
    this.dx = 0
    this.dy = 0
  }

  update() {
    super.update()
    this.x = this.x + this.dx
    this.y = this.y + this.dy
    this.dx = 0
    this.dy = 0
  }
}


export class Player extends AnimatedGameObject {
  constructor(x, y) {
    const img = document.querySelector("#character")
    super(x, y, {
      sheet: img,
      layer: "player",
      collisionTags: ["world", "pickups"]
    })
    this.row = 0
    this.col = 1
    this.speed = 3
    this.handlers = new HandlerManager([
      new EventHandler(),
      new GravityHandler({ 
        jumpForce: -10,
        maxGravity: 5,
        gravityForce: 1 }),
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 15, numberOfFrames: 3})
    ])
  }

  jump() {
    this.handlers.get(GravityHandler).jump(this)
  }

  update() {
    super.update()
  }

  handle(ev) {
    if (ev === "KeyW") { this.move("up") }
    if (ev === "KeyS") { this.move("down") }
    if (ev === "KeyA") { this.move("left") }
    if (ev === "KeyD") { this.move("right") }
    if (ev === "Space") { this.jump() }
  }

  move(direction) {
    if (direction === "up") {
      this.dy = this.dy + (-1) * this.speed
      this.row = 3
    } else if (direction === "down") {
      this.dy = this.dy + (1) * this.speed
      this.row = 0
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed
      this.row = 1
    } else if (direction === "right") {
      this.dx = this.dx + (1) * this.speed
      this.row = 2
    }
  }
}