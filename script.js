const tileSize = 32
const canvas = document.querySelector("#canvas")
canvas.width = 10 * tileSize
canvas.height = 15 * tileSize
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

const img = document.querySelector("#character")
const ground = document.querySelector("#ground")

class Map {
  constructor(mapFile) {
    this.tiles = []
    this._readMapFile(mapFile)
  }

  addTilesToMap(x, y, tileType) {
    // TODO:
    // Implementiere das erstellen von neuen Kartenkacheln hier
    // x und y sind die Positionen in der Kartendatei
    // tileType ist der Buchstabe der an dieser Stelle in der Kartendatei steht
    // this.tiles ist eine noch leere Liste, welche alle neuen Kacheln aufnimmt

    // Die Hintergrundkachel wird immer hinzugefügt!!! Andere Kacheln können dann
    // darauf plaziert werden.
    this.tiles.push(new Background(x, y))
  }

  drawMap() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].draw()
    }
  }

  _readMapFile(filename) {
    fetch(filename)
      .then((res) => res.text())
      .then((data) => {
        let rows = data.split("\n")
        for (let y = 0; y < rows.length; y++) {
          let row = rows[y].split("")
          for (let x = 0; x < row.length; x++) {
            this.addTilesToMap(x, y, row[x])
          }
        }
      })
  }
}

class Background {
  constructor(x, y) {
    this.sheet = ground
    this.x = x
    this.y = y
    this.tileSize = 32
    this.col = 0
    this.row = 0
  }

  draw() {
    ctx.drawImage(
      ground,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize
    )
  }
}

let map = null

let x = 64
let y = 128

let dx = 0
let dy = 0
let SPEED = 1

let pos = 0
let type = 0
let frameCounter = 0

function updateGameState() {
  x = x + dx * SPEED
  y = y + dy * SPEED
  if (dx + dy === 0) {
    pos = 1
  }
}

function animationLoop() {
  updateGameState()

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  map.drawMap()

  ctx.drawImage(
    img,
    pos * tileSize,
    type * tileSize,
    tileSize,
    tileSize,
    x,
    y,
    tileSize,
    tileSize
  )

  frameCounter++
  if (frameCounter >= 15) {
    pos++
    if (pos >= 3) {
      pos = 0
    }
    frameCounter = 0
  }

  window.requestAnimationFrame(animationLoop)
}

function main() {
  map = new Map("map.txt")
  window.requestAnimationFrame(animationLoop)
}

window.onkeydown = function (ev) {
  if (ev.code === "KeyW") {
    type = 3
    dy = -1
  }
  if (ev.code === "KeyS") {
    type = 0
    dy = 1
  }
  if (ev.code === "KeyA") {
    type = 1
    dx = -1
  }
  if (ev.code === "KeyD") {
    type = 2
    dx = 1
  }
}

window.onkeyup = function (ev) {
  if (ev.code === "KeyW") {
    dy = 0
  }
  if (ev.code === "KeyS") {
    dy = 0
  }
  if (ev.code === "KeyA") {
    dx = 0
  }
  if (ev.code === "KeyD") {
    dx = 0
  }
}

main()
