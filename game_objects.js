import EventHandler from "./event_handler.js"

const ground = document.querySelector("#ground")
const img = document.querySelector("#character")



export class GameObject {
  constructor(x, y, sheet) {
    this.sheet = sheet
    this.x = x
    this.y = y
    this.tileSize = 32
    this.col = 0
    this.row = 0
  }

  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize
    )
  }
}

export class Background extends GameObject {
  constructor(x, y) {
    super(x, y, ground)
    this.row = 0
    this.col = 0
  }
}

export class Stone extends GameObject {
  constructor(x, y) {
    super(x, y, ground)
    this.row = 0
    this.col = 1
  }
}

export class Player extends GameObject {
  constructor(x, y) {
    super(x, y, img)
    this.row = 0
    this.col = 1
    this.eventHandler = new EventHandler()
  }

  update() {
    
  }

  move(direction) {
    if (direction === "up") {
      this.y = this.y - 5 / this.tileSize
    }
  }
}