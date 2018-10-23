class Enemy {

    constructor(x, y) {
        this.isDead = false
        this.sx = 32 * 2
        this.sy = 0
        this.width = 32
        this.height = 32
        this.x = x
        this.y = y
        this.speed = 5
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    move(direction) {
        this.x += (this.speed * direction)
    }
    down() {
        this.y += 16
    }

}