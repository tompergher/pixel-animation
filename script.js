const tileSize = 32
const canvas = document.querySelector("#canvas")
canvas.width = 10 * tileSize
canvas.height = 15 * tileSize
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
const img = document.querySelector("#character")

let x = 0
let y = 0

function animationLoop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, x, y, canvas.width, canvas.height)

    window.requestAnimationFrame(animationLoop)
}

function main() {
    readMapFile("map.txt")
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

function drawTileOnMap(xTilePos, yTilePos, xPos, yPos) {
    ctx.drawImage(img,
        xTilePos * tileSize, yTilePos * tileSize, tileSize, tileSize,
        xPos*tileSize, yPos*tileSize, tileSize, tileSize)
}

function readMapFile(filename) {
    fetch(filename).then((res) => res.text()).then((data) => {
        let rows = data.split("\n")
        for (let y = 0; y < rows.length; y++) {
            let cells = rows[y].split("")
            for (let x = 0; x < cells.length; x++) {
                
                pickMapTile(x, y, cells[x])

            }
        }
    })
}

main()