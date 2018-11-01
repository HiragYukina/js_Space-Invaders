class Bullet {
    constructor(x, y) {
        this.sx = 32
        this.sy = 0
        this.width = 3
        this.height = 16
        this.x = x
        this.y = y
        this.speed = 4
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    move() {
        this.y -= this.speed
    }

}