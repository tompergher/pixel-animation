import Game from "./game.js"
import {Player, Backstein, Ice, Pflasterbeige1reg, Pflastergrau1unreg, Pflastergrau2reg, Pflasterbeige2unreg, Sand, Plattenbeige, Macha, Dirtweg, Sakura, Bonsai, Boss, Sushi, Katana, Origami, desertrose, coin, totenkopf, vase, hirschstab, mumie, Kaktus, Chilli, Nachos, Avocado, Dia_de_los_Muertos, Taco, Stone, cave, Lava, Wasser, SushiShoot   } from "./game_objects.js"

/**
 * Diese Klasse liest eine Kartendatei und erstellt die Spiel-Objekte
 * an den Stellen die in der Karte angegeben sind.
 */
export default class Map {
  constructor(mapFile) {
    this.currentMapFile = mapFile
    this._readMapFile(mapFile)
    const canvas = document.querySelector("#canvas")
    if ( mapFile === "maps/map.mexico.txt") {
      canvas.style.backgroundImage = "url('res/GlobalJumperBackground.png')"
    } else if ( mapFile === "maps/map.france.txt") {
      canvas.style.backgroundImage = "url('res/Frankreich.png')"
    } else if ( mapFile === "maps/map.Japan.txt") {
      canvas.style.backgroundImage = "url('res/Japan Background.png')"
      document.getElementById("character") === "url('res/Characterdesign Japan.png')"
    }
    else if ( mapFile === "maps/map.egypt.txt") {
    canvas.style.backgroundImage = "url('res/egypt verenderig.png')"
  }
  }

  /**
   * Erstelle neue Spiel-Objekte an den jeweiligen Stellen.
   * @param {number} x Die x-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {number} y Die y-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {string} tileType Der Buchstabe an der Stelle in der Karte.
   */
  addTilesToMap(x, y, tileType) {
    //new Background(x, y)

    if ( tileType === "a" ) { new Backstein(x, y) }
    if ( tileType === "I" ) { new Ice(x, y) }
    if ( tileType === "b" ) { new Pflasterbeige1reg(x, y) }
    if ( tileType === "c" ) { new Pflastergrau1unreg(x, y) }
    if ( tileType === "d" ) { new Pflastergrau2reg(x, y) }
    if ( tileType === "e" ) { new Pflasterbeige2unreg(x, y) }
    if ( tileType === "f" ) { new Sand(x, y) }
    if ( tileType === "g" ) { new Plattenbeige(x, y) }
    if ( tileType === "h" ) { new Macha(x, y) }
    if ( tileType === "i" ) { new Dirtweg(x, y) }
    if ( tileType === "s" ) { new Sakura(x, y) }
    if ( tileType === "n" ) { new Bonsai(x, y) }
    if ( tileType === "x" ) { new Boss(x, y) }
    if ( tileType === "y" ) { new Sushi(x, y) }
    if ( tileType === "Y" ) { new SushiShoot(x, y) }
    if ( tileType === "z" ) { new Katana(x, y) }
    if ( tileType === "o" ) { new Origami(x, y,) }
    
    
    
    
    if ( tileType === "r" ) { new desertrose(x, y) }
    if ( tileType === "C" ) { new coin(x, y) }
    if ( tileType === "t" ) { new totenkopf(x, y) }
    if ( tileType === "m" ) { new mumie(x, y) }
    if ( tileType === "H" ) { new hirschstab(x, y) }
    if ( tileType === "v" ) { new vase(x, y) }
    if ( tileType === "k" ) { new Kaktus(x, y) }
    if ( tileType === "j" ) { new Chilli(x, y) }
    if ( tileType === "l" ) { new Taco(x, y) }
    if ( tileType === "p" ) { new Nachos(x, y) }
    if ( tileType === "A" ) { new Avocado(x, y) }
    if ( tileType === "D" ) { new Dia_de_los_Muertos(x, y) }
    if ( tileType === "S" ) { new Stone(x, y) }
    if ( tileType === "X" ) { new cave(x, y) }
    if ( tileType === "L" ) { new Lava(x, y) }
    if ( tileType === "W" ) { new Wasser(x, y) }
    if ( tileType === "P" ) { Game.player = new Player(x, y)}
    if ( tileType === "Q" ) { Game.player2 = new Player(x, y)}
  }

  /**
   * Liest die Karte aus der Datei und ruft die Erstellung der Spiel-Objekte auf.
   */
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

