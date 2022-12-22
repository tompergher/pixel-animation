const tileSize = 32
const canvas = document.querySelector("#canvas")
canvas.width = 10 * tileSize
canvas.height = 15 * tileSize
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
const img = document.querySelector("#character")
const ground = document.querySelector("#ground")
const map = []
let x = 64
let y = 128
let pos = 0
let type = 0
let frameCounter = 0

function animationLoop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawMap()

    ctx.drawImage(img, pos * tileSize, type * tileSize, tileSize, tileSize,
        x, y, tileSize, tileSize)

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
    readMapFile("map.txt")
    window.requestAnimationFrame(animationLoop)
}

function pickMapTile(x, y, tileType) {
    // draw Background tile first
    drawTileOnMap(0, 0, x, y)

    // Implementiere die Logik für das auswählen der Kachel
    if (tileType === ".")      { /* do nothing */ } 
    else if (tileType === "s") { drawTileOnMap(1, 0, x, y) }
    else if (tileType === "p") { drawTileOnMap(2, 0, x, y) }
    else if (tileType === "f") { drawTileOnMap(3, 0, x, y) }

    else if (tileType === "t") { drawTileOnMap(0, 1, x, y) }
    else if (tileType === "b") { drawTileOnMap(1, 1, x, y) }
    else if (tileType === "h") { drawTileOnMap(2, 1, x, y) }
    else if (tileType === "w") { drawTileOnMap(3, 1, x, y) }
    
    else if (tileType === "B") { drawTileOnMap(1, 0, x, y); drawTileOnMap(2, 0, x, y) }

    

}

function drawMap() {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        pickMapTile(x, y, map[y][x]);
      }
    }
}

function drawTileOnMap(xTilePos, yTilePos, xPos, yPos) {
    //console.log(xPos, yPos)
    ctx.drawImage(ground,
        xTilePos * tileSize, yTilePos * tileSize, tileSize, tileSize,
        xPos*tileSize, yPos*tileSize, tileSize, tileSize)
}

function readMapFile(filename) {
    fetch(filename).then((res) => res.text()).then((data) => {
        let rows = data.split("\n")
        for (let y = 0; y < rows.length; y++) {
            map.push(rows[y].split(""))
        }
    })
}

window.onkeydown = function(ev) {
    console.log(ev.code)
    if (ev.code === "KeyW") { type = 3; y-=5}
    if (ev.code === "KeyS") { type = 0; y+=5}
    if (ev.code === "KeyA") { type = 1; x-=5}
    if (ev.code === "KeyD") { type = 2; x+=5}
}

main()