import Game from "./game.js"

let game = null

function animationLoop() {
  game.gameLoop()

  window.requestAnimationFrame(animationLoop)
}

function main() {
  game = new Game()
  window.requestAnimationFrame(animationLoop)
}

main()
