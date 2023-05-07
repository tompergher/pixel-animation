import {AnimationHandler, CollisionHandler, GravityHandler, HandlerManager} from "./event_handler.js"
import { findAndRemoveFromList } from "./utils.js"
import TileRegistry from "./tile_registry.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import Game from "./game.js"

/**
 * Dies ist die Basisklasse für alle Spiel-Objekte.
 * 
 * Wenn ein spezialisiertes Spiel-Objekt erzeugt wird, dann soll es 
 * immer diese Klasse erweitern. Wenn die Funktionen von der Basisklasse
 * überschrieben werden, sollten diese immer zuerst mit `super.function()` 
 * aufgerufen werden, so das die eigentliche Funktionalität der Spiel-Objekte
 * erhalten bleibt.
 */
export class GameObject {
  constructor(x, y, options = {sheet, layer: "background", collisionTags: []}) {
    this.sheet = options.sheet
    this.tileSize = 64
    this.x = x * this.tileSize
    this.y = y * this.tileSize
    this.col = 0
    this.row = 0
    this.layer = options.layer
    this.handlers = new HandlerManager([])
    TileRegistry.layers[this.layer].push(this)
    this.collisionTags = options.collisionTags
    this.collisionTags.forEach(tag => {
      CollisionDetector.layers[tag].push(this)
    })
  }

  /**
   * Zeichnet das Spiel-Objekt auf das Canvas. Das Spiel-Objekt
   * kennt dabei seine Position und welches Bild gezeichnet werden soll.
   * @param {CanvasRenderingContext2D} ctx Das Canvas, worauf das Spiel-Objekt gezeichnet werden soll.
   */
  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y, this.tileSize, this.tileSize
    )
  }

  /**
   * Zerstört das Spiel-Objekt und entfernt es aus dem Spiel.
   */
  destroy() {
    findAndRemoveFromList(TileRegistry.layers[this.layer], this)
    this.collisionTags.forEach(tag => {
      findAndRemoveFromList(CollisionDetector.layers[tag], this)
    })
  }

  /**
   * Berechne die Position und andere Eigenschaften des 
   * Spiel-Objekts neu. Wie das gemacht wird, wird in den 
   * verschieden Handlers angegeben. Ein Spiel-Objekt kann
   * z.B. einen Gravitations-Handler haben, dieser fügt dann
   * Gravitation für dieses Spiel-Objekt hinzu und berechnet die 
   * y-Position des Spiel-Objekts neu.
   */
  update(){
    this.handlers && this.handlers.runAll(this)
  }


}

export class Dia_de_los_Muertos extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#MexicoObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 0
    this.col = 0
  }
}

export class Kaktus extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#MexicoObject")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })

    this.row = 1
    this.col = 2
  }
}


export class Chilli extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#MexicoObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 1
    this.col = 1
  }
}


export class Avocado extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#MexicoObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 0
    this.col = 1
  }
}

export class Nachos extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#MexicoObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 0
    this.col = 2
  }
}


export class Taco extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#MexicoObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 1
    this.col = 0
  }
}


export class Stone extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#objectsGeneral")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })

    this.row = 0
    this.col = 1
  }
}







export class coin extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#EgyptObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 0
    this.col = 2
  }
}
export class totenkopf extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#EgyptObject")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })

    this.row = 0
    this.col = 1
  }
}
export class mumie extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#EgyptObject")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })

    this.row = 1
    this.col = 0
  }
}
export class hirschstab extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#EgyptObject")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })

    this.row = 1
    this.col = 1
  }
}
export class vase extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#EgyptObject")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })

    this.row = 1
    this.col = 2
  }
}


export class desertrose extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#EgyptObject")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })

    this.row = 0
    this.col = 0
  }
}



export class Sakura extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#JapanObjekte")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Bonsai extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#JapanObjekte")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}



export class Sushi extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#JapanObjekte")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 1
    this.col = 0
  }
}


export class SushiShoot extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#JapanObjekte")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["weapon"]
    })
    this.row = 1
    this.col = 0
    this.dx = 7
  }

  update() {
    super.update()
    this.x += this.dx
  }
}

export class Katana extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#JapanObjekte")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 1
  }
}

export class Origami extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#JapanObjekte")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["damage"]
    })
    this.row = 1
    this.col = 2
    this.leftRemaining = Math.round(650 * Math.random()) + 350
    this.speed = 5
    this.rightRemaining = 0
  }

  update() {
    super.update()
    if (this.leftRemaining > 0) {
      this.goLefti()
    }
  if (this.rightRemaining > 0) {
    this.goRighti()
  } 
 

}





goLefti() {
  this.x = this.x - this.speed
  this.leftRemaining--
  if (this.leftRemaining <=0) {
  this.rightRemaining = Math.round(650 * Math.random()) + 350
  }
  
}


goRighti() {
  this.x = this.x + this.speed
  this.rightRemaining--
  if (this.rightRemaining <=0) {
  this.leftRemaining = Math.round(650 * Math.random()) + 350
  }
  
  
}   }

   


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

export class Backstein extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 1
  }
}

export class Lava extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#groundNr2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Wasser extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#groundNr2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 2
  }
}

export class Ice extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["forest"]
    })
    this.row = 0
    this.col = 1
  }
}


export class Pflasterbeige1reg extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 2
  }
}

export class Macha extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 2
    this.col = 4
  }
}


export class Dirtweg extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 3
  }
}

export class Pflastergrau1unreg extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 3
  }
}

export class Pflastergrau2reg extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 2
    this.col = 0
  }
}

export class Pflasterbeige2unreg extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 0
  }
}

export class Sand extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 2
  }
}

export class Plattenbeige extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 2
    this.col = 2
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

export class cave extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#objectsGeneral")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["cave"]
    })
    this.row = 1
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
    let img = document.querySelector("#characterMexico")
    if (Game.map.currentMapFile === "maps/map.Japan.txt") {
      img = document.querySelector("#characterJapan")
    } else if (Game.map.currentMapFile === "maps/map.france.txt") {
      img = document.querySelector("#characterFrance")
    }
    else if (Game.map.currentMapFile === "maps/map.egypt.txt") {
      img = document.querySelector("#characterEgypt")
    }
    super(x, y, {
      sheet: img,
      layer: "player",
      collisionTags: ["world", "pickups", "cave", "damage"]
    })
    this.tileSize = 128
    this.row = 0
    this.col = 1
    this.speed = 3
    this.shots = 10
    
    this.handlers = new HandlerManager([
      new GravityHandler({ 
        jumpForce: -17,
        maxGravity: 13,
        gravityForce: 1 }),
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 9, numberOfFrames: 4})
      
    ])
  }

  
    

  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y, this.tileSize, this.tileSize
    )
  }

  jump() {
    this.handlers.get(GravityHandler).jump(this)
  }

  update() {
    super.update()
  }

  shoot() {
    if (this.shots > 0) {
      
        new SushiShoot(this.x / 64 + 2, this.y / 64 + 1)
      this.shots--}

     
  }

  move(direction) {
    if (direction === "up") {
      this.dy = this.dy + (-1) * this.speed
      this.row = 3
    } else if (direction === "down") {
      this.dy = this.dy + (1) * this.speed
      this.row = 0
    } else if (direction === "left") {
      this.dx = this.dx + (-1.5) * this.speed
      this.row = 1
      Camera.shiftBackground(1)
    } else if (direction === "right") {
      this.dx = this.dx + (1.5) * this.speed
      this.row = 0
      Camera.shiftBackground(-1)
    }
  }
}

export class Boss extends AnimatedGameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Samurai")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world", "weapon", "damage"]
    })
    
    this.tileSize = 64
    this.row = 0
    this.col = 0
    this.speed = 9
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 5, numberOfFrames: 5})
    ])
  }
  

  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y - 64, this.tileSize + 64, this.tileSize + 64
    )
  }

  update() {
    super.update()
    if (this.x - Game.player.x < 850) {
      this.followPlayer()
    }
  }
  
  followPlayer()  {
    if (Game.player.x < this.x) {
    this.move("left")}

    if (Game.player.x > this.x) {
      this.move("right")
    }
}
  move(direction) {
   if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed
      this.row = 0
     
    } else if (direction === "right") {
      this.dx = this.dx + (1) * this.speed
      this.row = 1
    }
  }




}
