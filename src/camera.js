export default class Camera {
  constructor(game, offset = { x: 0, y: 0 }) {
    this.game = game
    this.offset = offset
  }

  clearScreen() {
    const transform = this.game.ctx.getTransform()
    this.game.ctx.clearRect(-transform.e, -transform.f, this.game.canvas.width, this.game.canvas.height);
  }

  centerObject(object) {
    this.centerCoordinate(object.x, object.y, object.tileSize)
  }

  centerCoordinate(x, y, tileSize) {
    this.game.ctx.setTransform(1, 0, 0, 1,
      (-x + this.offset.x) * tileSize + this.game.canvas.width/2,
      (-y + this.offset.y) * tileSize +this.game.canvas.height / 2)
  }
}