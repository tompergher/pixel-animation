const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false;
const img = document.querySelector("#character")

let x = 0
let y = 0
let pos = 0
let frameCounter = 0

function animationLoop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, pos * 32, 0, 32, 32, x, y, canvas.width, canvas.height)

    frameCounter++
    if (frameCounter >= 10) {
        pos++
        if (pos >= 3) {
            pos = 0
        }
        frameCounter = 0
    }

    window.requestAnimationFrame(animationLoop)
}

function main() {
    window.requestAnimationFrame(animationLoop)
}

main()