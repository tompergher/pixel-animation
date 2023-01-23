import { Player } from "./game_objects.js"
import Map from "./map.js"

const tileSize = 32
const canvas = document.querySelector("#canvas")
canvas.width = 10 * tileSize
canvas.height = 15 * tileSize
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let map = null
let player = null

function animationLoop() {
  player.update()

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  map.drawMap(ctx)
  player.draw(ctx)

  window.requestAnimationFrame(animationLoop)
}

function main() {
  map = new Map("map.txt")
  player = new Player(4, 5)
  window.requestAnimationFrame(animationLoop)
}

main()
