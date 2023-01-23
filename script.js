import Map from "./map.js"

const tileSize = 32
const canvas = document.querySelector("#canvas")
canvas.width = 10 * tileSize
canvas.height = 15 * tileSize
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

const img = document.querySelector("#character")

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

  map.drawMap(ctx)

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
