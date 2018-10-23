class Player {

    constructor() {
        this.sx = 0
        this.sy = 0
        this.width = 32
        this.height = 32
        this.x = (canvas.width / 2) - this.width / 2
        this.y = canvas.height - 50
        this.speed = 5
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height)    }

    move(key, gamepad, axes) {
        if (0 <= this.x && this.x + this.width <= canvas.width) {
            if (0 <= this.y && this.y + this.height <= canvas.height) {
                if (key.d || gamepad.right) {
                    this.x += this.speed
                }
                if (key.a || gamepad.left) {
                    this.x -= this.speed
                }
                /*if (key.w || gamepad.up) {
                     this.y -= this.speed
                 }
                 if (key.s || gamepad.down) {
                     this.y += this.speed
                 }*/
                if (axes && gamepadAPI.turbo) {
                    //this.x += axes[0] * 5
                    //this.y += axes[1] * 5
                }
            } else {
                if (this.y < 0) {
                    this.y = 0
                } else {
                    this.y = canvas.height - this.height
                }
            }
        } else {
            if (this.x < 0) {
                this.x = 0
            } else {
                this.x = canvas.width - this.width
            }
        }
    }

}