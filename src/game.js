import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import TileRegistry from "./tile_registry.js"
import EventHandler from "./event_handler.js"
import InputHandler from "./event_handler.js"






/**
 * Diese Klasse enthält die globalen Variablen für das Spiel,
 * sowie das GameLoop, welches das Spiel zeichnen soll.
 */
export default class Game {

  static map = null;
  static player = null;
  static player2 = null;
  static running = false;
  static currentFrame = 0;
  static lastTimeDamage = 0;
  



  
  
    constructor() {
    this.tileSize = 64
    this.canvas = document.querySelector("#canvas")
    this.canvas.width = 26 * this.tileSize
    this.canvas.height = 11 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    new EventHandler()

    Game.loadMap("maps/map.mexico.txt")

    
   
    
    
    document.querySelector("#startbutton").addEventListener("click", () => {
      StartGame5()
    })

    document.querySelector("#egypt-button").addEventListener("click", () => {
      Game.loadMap("maps/map.egypt.txt")
    })

    document.querySelector("#japan-button").addEventListener("click", () => {
      Game.loadMap("maps/map.Japan.txt")
    })

    document.querySelector("#france-button").addEventListener("click", () => {
      Game.loadMap("maps/map.france.txt")
    })

    document.querySelector("#mexico-button").addEventListener("click", () => {
      Game.loadMap("maps/map.mexico.txt")
    })

    document.querySelector("#mexico").addEventListener("click", (ev) => {
      console.log("Mexico")
      Game.loadMap("maps/map.mexico.txt")
      document.querySelector("#overlay").style.display = "none"
    })

    document.querySelector("#france").addEventListener("click", (ev) => {
      console.log("France")
      Game.loadMap("maps/map.france.txt")
      document.querySelector("#overlay").style.display = "none"
    })
    
    document.querySelector("#egypt").addEventListener("click", (ev) => {
      console.log("Egypt")
      Game.loadMap("maps/map.egypt.txt")
      document.querySelector("#overlay").style.display = "none"
    })

    document.querySelector(".Japan").addEventListener("click", (ev) => {
      console.log("Japan")
      Game.loadMap("maps/map.Japan.txt")
      document.querySelector("#overlay").style.display = "none"
    })

    //document.querySelector("#Startbildschirm").style.display = "none"

  

    this.camera = new Camera(this)

    Game.running = false
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }


  

  /**
   * Startet das Spiel.
   * 
   * Das Spiel wird gestartet indem die Animationsschleife
   * des Spiels aufgerufen wird.
   */
  static start() {
    Game.running = true
  }


  static gameover(){
    alert("Game Over")
    //reset lifeCounter to 3
    const lifeElement = document.querySelector("#life")
    let lifeCounter = parseInt(lifeElement.textContent)
    lifeElement.textContent = 3


    console.log(Game.map.currentMapFile)
    Game.loadMap(Game.map.currentMapFile)
    

  }

  
 





  static loseLife() {
    if (Game.currentFrame - Game.lastTimeDamage >= 60) {
      console.log("loseLife")
      Game.lastTimeDamage = Game.currentFrame
      const lifeElement = document.querySelector("#life")
      let lifeCounter = parseInt(lifeElement.textContent)
      lifeElement.textContent = lifeCounter - 1
      if (lifeCounter <= 1) {
        Game.gameover()
        
      }
    }
  }

  static winLife() {
    console.log("winLife")
    const lifeElement = document.querySelector("#life")
    let lifeCounter = parseInt(lifeElement.textContent)
    lifeElement.textContent = lifeCounter + 1

  }

  

  

  static reduceLifeby3() {
    const lifeElement = document.querySelector("#life")
    let lifeCounter = parseInt(lifeElement.textContent)
    lifeElement.textContent = lifeCounter - 3
  }


  /**
   * Pausiert das Spiel.
   * 
   * Die Animationsschleife des Spiels wird unterbrochen,
   * dadurch wird das Spiel pausiert.
   * 
   * Um das Spiel weiterlaufen zu lassen, muss die Methode                                                                                      
   * `start()` aufgerufen werden.
   */
  static pause() {
    Game.running = false
  }

  static loadMap(mapfile) { 
      TileRegistry.clear()
      CollisionDetector.clear()
      Game.player = null
      Game.map = new Map(mapfile)
      Camera.resetBackground()
      

      InputHandler.events.clear()
  }

  /**
   * Berechnet jeweils das nächste Frame für das Spiel.
   * Die Positionen der Spiel-Objekte werden neu berechnet,
   * die Kamera wird korrekt ausgerichtet und die 
   * Spiel-Objekte werden neu gezeichnet.
   */
  gameLoop() {

    Game.currentFrame++
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    EventHandler.handleAllEvents()

    TileRegistry.updateAllTiles()
    CollisionDetector.checkCollision("all")

    if (Game.player) {
      
      console.log(Game.player.x, Game.player.y)
      if (Game.player.x > 780) {
        this.camera.centerObject(Game.player)
      } else {
        this.camera.centerCoordinate(970 - 3 * 64, 350)
      }

    }
    

    TileRegistry.drawAllTiles(this.ctx)

    if (Game.running === true) {
      window.requestAnimationFrame(this.gameLoop.bind(this))
    }
  }
}



function StartGame5() {

  document.querySelector("#Startbildschirm").style.display = "none"
  document.querySelector("#startbutton").style.display = "none"

}

