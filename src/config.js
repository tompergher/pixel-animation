import Game from "./game.js"

const config = {
  "keys": {
    "KeyW": function() { Game.player.jump()},
    "KeyA": function() { Game.player.move("left")},
    "KeyD": function() { Game.player.move("right")},
    "Space": function() {Game.player.jump(); Game.loseLife() },
    "ArrowUp": function() { Game.player.jump()},
    "ArrowLeft": function() { Game.player.move("left")},
    "ArrowRight": function() { Game.player.move("right")},
  }
}

export default config;