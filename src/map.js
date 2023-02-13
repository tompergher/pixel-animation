import { Background, Mushroom, Stone, Tree } from "./game_objects.js"

export default class Map {
  constructor(mapFile) {
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
    new Background(x, y)
    if ( tileType === "s" ) { new Stone(x, y) }
    if ( tileType === "t" ) { new Tree(x, y) }
    if ( tileType === "p" ) { new Mushroom(x, y) }
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

