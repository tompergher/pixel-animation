import { calculatePenetration } from "./collision_detector.js"
import { Avocado, Boss, Chilli, Dia_de_los_Muertos, Kaktus, Lava, Nachos, Player, Sushi, Taco, Wasser, Sakura } from "./game_objects.js"
import Game from "./game.js"
import config from "./config.js"
import Map from "./map.js"


export default class InputHandler {

  static events = new Set()
  static commands = []

  constructor() {
    // Setup Eventlisteners
    window.onkeydown = (ev) => {InputHandler.events.add(ev.code); return false}
    window.onkeyup = (ev) => {InputHandler.events.delete(ev.code)}
    Object.entries(config["keys"]).forEach(([key, callback]) => {
      new Command(key, callback)
    })
  }

  static handleAllEvents() {
    InputHandler.events.forEach((ev) => {
      InputHandler.commands.forEach(command => {
        if (command.key === ev) {
          command.callback()
        }
      })
    })
    
  }
}


class Command {
  constructor(key, callback) {
    this.key = key
    this.callback = callback
    InputHandler.commands.push(this)
  }
}

export class GravityHandler {
  constructor(options) {
    this.gravity = 0
    this.maxGravity = options.maxGravity
    this.jumpForce = options.jumpForce
    this.gravityForce = options.gravityForce || 0
  }

  jump(gameObject) {
    if (gameObject.isStanding) {
      this.gravity = this.jumpForce
      gameObject.isStanding = false
      gameObject.isJumping = true
    } else if (gameObject.isJumping && this.gravity > 0) {
      this.gravity = this.jumpForce
      gameObject.isStanding = false
      gameObject.isJumping = false
    }

  }

  _handleEvents(gameObject) {
    gameObject.y = gameObject.y + this.gravity
    this.gravity = Math.min(this.gravity + this.gravityForce, this.maxGravity)
  }
}

export class HandlerManager {
  constructor(handlers) {
    this.handlers = [...handlers]
  }

  add(handler) {
    this.handlers.push(handler)
  }

  remove(handler) {
    this.handlers.splice(this.handlers.indexOf(handler), 1)
  }

  get(handlerType) {
    let result = this.handlers.filter(handler => handler instanceof handlerType)
    return result[0]
  }

  runAll(gameObject) {
    this.handlers.forEach(handler => handler._handleEvents(gameObject))
  }
}

export class CollisionHandler {
  _handleEvents(gameObject, options) {
    // Es soll nichts passieren wenn kein anderes Objekt gesetzt wird
    if (options == null) return

    // Wenn das andere Objekt der Spieler ist, soll nicht passieren
    if (options.other instanceof Player) return

    let collidingObject = options.other

    // Wenn das andere Objekt aus der Welt oder dem Wald ist,
    // soll eine Überschneidung vermieden werden, indem das
    // Objekt aus dem überschneidenden Objekt herausgedrückt wird.
    if (collidingObject.collisionTags.includes("world") || collidingObject.collisionTags.includes("forest")) {
      const pen = calculatePenetration(gameObject, collidingObject)
      if (Math.abs(pen.x) <= Math.abs(pen.y)) {
        gameObject.x = gameObject.x - pen.x
      } else {
        gameObject.y = gameObject.y - pen.y
        const gravityHandler = gameObject.handlers.get(GravityHandler)
        if (gravityHandler != null) {
          if (gravityHandler.gravity >= 0) {
            gameObject.isStanding = true
          }
          gravityHandler.gravity = 0
        }
      }
    }

    // Wenn das kollidierende Objekt aus Pickups ist, wird es entfernt.
    if (collidingObject.collisionTags.includes("pickups")) {
      collidingObject.destroy()
      if (collidingObject instanceof Chilli){
        Game.loseLife()
      }
      if (collidingObject instanceof Dia_de_los_Muertos){
        Game.loseLife()
      }
      if (collidingObject instanceof Avocado){
        Game.winLife()
      }
      if (collidingObject instanceof Taco){
        Game.winLife()
      }
      if (collidingObject instanceof Nachos){
        Game.winLife()
      }

      if (collidingObject instanceof Sakura){
        Game.SakuraCounter()
      }
      
      //if (collidingObject instanceof Sushi){
       // sscounter = sscounter + 1
      //}
      
      
    }
    
    if (collidingObject instanceof Kaktus){
      Game.loseLife()
    }

    if (collidingObject instanceof Lava){
      Game.gameover()
    }

    if (collidingObject instanceof Wasser){
      Game.gameover()
    }


    if (collidingObject.collisionTags.includes("cave")) {
      Game.loadMap("maps/map.france.txt")
    }

    if (collidingObject.collisionTags.includes("damage")) {
      Game.loseLife(5)
    }
    let bosslife = 1
    if (collidingObject.collisionTags.includes("weapon") && gameObject instanceof Boss) {
      bosslife = bosslife -1
      collidingObject.destroy()
    }

    if(bosslife <= 0) {gameObject.destroy()
      collidingObject.destroy()
      
      }
    }

    if(_sakuracc = 1) {
      Map.barrier.forEach((el) => {
         el.destroy()}
    )}
      //Map.barrier.forEach((el) => {
       // el.destroy()


    //gameObject.destroy()
      //collidingObject.destroy()
      //Map.barrier.forEach((el) => {
        //el.destroy()
     // })

  }




export class AnimationHandler {
  constructor(options) {
    this.frameCounter = 0
    this.framesPerAnimation = options.framesPerAnimation
    this.numberOfFrames = options.numberOfFrames
  }

  _handleEvents(gameObject) {
    // Only run the animation if the object moved
    if (gameObject.dx != 0 || gameObject.dy != 0) {
      this.frameCounter++
      if (this.frameCounter >= this.framesPerAnimation) {
        gameObject.col++
        if (gameObject.col >= this.numberOfFrames) {
          gameObject.col = 0
        }
        this.frameCounter = 0
      }
    }

  }
}
let sakuracc = 0
function SakuraCounter() {
  sakuracc = sakuracc + 1
console.log(parseInt(sakuracc))
}