import Game from "./game.js"

const config = {
  "keys": {
    "KeyW": function() { Game.player && Game.player.jump()},
    "KeyA": function() { Game.player && Game.player.move("left")},
    "KeyD": function() { Game.player && Game.player.move("right")},
    "Space": function() {Game.player && Game.player.jump()},
    "ArrowUp": function() { Game.player && Game.player.jump()},
    "ArrowLeft": function() { Game.player && Game.player.move("left")},
    "ArrowRight": function() { Game.player && Game.player.move("right")},
  }
}

export default config;