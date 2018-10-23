let bullets = []

let isShoot = true

let gameRender = () => {
    player.draw(ctx, image)
    enemys.forEach(enemy => {
        if (!enemy.isDead) {
            enemy.draw(ctx, image)
        }
    })

    bullets.forEach(bullet => {
        bullet.draw(ctx, image)
    })
    enemyBullets.forEach(bulle => {
        bulle.draw(ctx, image)
    })

}

let mainGame = () => {
    const gamepad = gamepadAPI.buttonsStatus
    const axes = gamepadAPI.axesStatus

    enemyProcessing()

    player.move(key, gamepad, axes)
    shoot(key, gamepad)
    playerCollision()
    bulletDelete()
}

let playerCollision = () => {
    //今回は、簡単な円の当たり判定を使っていく
    enemys.forEach(enemy => {
        const er = enemy.width / 2
        const enemyCenterX = enemy.x + enemy.width / 2
        const enemyCenterY = enemy.y - enemy.height / 2

        const pr = player.width / 2
        const playerCenterX = player.x + player.width / 2
        const playerCenterY = player.y - player.height / 2

        const x = (enemyCenterX - playerCenterX) ** 2
        const y = (enemyCenterY - playerCenterY) ** 2
        const r = (er + pr) ** 2

        if (x + y <= r) {
            gameMode = "over"
        }
    })

    let c = 0
    enemyBullets.forEach(bullet => {

        /**時計回り
         * 1-----2
         * |     |  
         * |     |
         * |     |
         * 4-----3
         */

        const bX1 = bullet.x
        const bY1 = bullet.y

        const bX2 = bullet.x + bullet.width
        const bY2 = bY1

        const bX3 = bX2
        const bY3 = bY1 + bullet.height

        const bX4 = bX1
        const bY4 = bY3


/*
            if (x + y < r) {
                enemyBullets.splice(c, 1)
            }*/
        c++

    })

}

let shoot = (key, gamepad) => {
    bulletGeneration(key, gamepad)
    bullets.forEach(bullet => {
        bullet.move()
    })
}


let bulletGeneration = (key, gamepad) => {
    if ((key.e || gamepad.A) && isShoot) {
        const bullet = new Bullet(player.x + (player.width / 2), player.y)
        bullets.push(bullet)
        isShoot = false
    }
}

let bulletDelete = () => {
    bullets.some((v, i) => {
        if (v.y < -10) {
            bullets.splice(i, 1)
            isShoot = true;
        }
    })
    enemyBullets.some((v, i) => {
        if (v.y > canvas.height + 10) {
            enemyBullets.splice(i, 1)
        }
    })
}