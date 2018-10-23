let elapsedTime = 0
let enemyShootTime = 0

let enemyBullets = []

let isMove = true
let isdown = false

let count = (enemyValue.x * enemyValue.y) - 1

//方向　右：１　左：-1
let direction = 1
//左用のカウント
let le = 0


let enemyProcessing = () => {
    let difference = 0
    if (time.lastTime != null) {
        difference = (time.currentTime - time.lastTime) / 1000
    }
    elapsedTime += difference
    enemyShootTime += difference

    time.lastTime = time.currentTime

    if (elapsedTime > 0.03) {
        elapsedTime -= 0.03
        enemysMove()
    }

    if (enemyShootTime > 1) {
        enemyShootTime -= 1
        enemyShoot()
    }

    enemyCollision()

    enemyBullets.forEach(bullet => {
        bullet.move()
    })

}



let enemysMove = () => {
    if (isdown) {
        enemysMoveDown(direction)
    } else {
        switch (direction) {
            //方向　右：１　左：-1 
            case 1:
                enemysMoveRight(direction)
                break
            case -1:
                enemysMoveLeft(direction)
                break
        }
    }
}

let enemysMoveDown = (toward) => {
    switch (toward) {
        case 1:
            if (!enemys[count].isDead) {
                enemys[count].down()
            }
            count--
            if (count < 0) {
                isdown = false
                direction = -1
                count = (enemyValue.x * enemyValue.y) - (enemyValue.x)
            }
            break;

        case -1:
            if (!enemys[count].isDead) {
                enemys[count].down()
            }
            count++
            le++
            if (le >= enemyValue.x) {
                count -= enemyValue.x * 2
                le = 0
            }
            if (count == -enemyValue.x) {
                isdown = false
                direction = 1
                count = (enemyValue.x * enemyValue.y) - 1
                le = 0
            }
            break;
    }

}

let enemysMoveRight = () => {
    let cornerMax = 0
    enemys.forEach(enemy => {
        if (!enemy.isDead) {
            const enemyPosition = enemy.x + enemy.width
            if (enemyPosition > cornerMax) {
                cornerMax = enemyPosition
            }
        }
    })

    if (!enemys[count].isDead) {
        enemys[count].move(direction)
    }
    count--
    if (count < 0) {
        count = enemyValue.x * enemyValue.y - 1
        if (cornerMax >= canvas.width - 20) {
            isdown = true
        }
    }
}

let enemysMoveLeft = () => {
    let cornerMin = canvas.width
    enemys.forEach(enemy => {
        if (!enemy.isDead) {
            const enemyPosition = enemy.x
            if (enemyPosition < cornerMin) {
                cornerMin = enemyPosition
            }
        }
    })
    if (!enemys[count].isDead) {
        enemys[count].move(direction)
    }
    count++
    le++
    if (le >= enemyValue.x) {
        count -= enemyValue.x * 2
        le = 0
    }
    if (count == -enemyValue.x) {
        count = (enemyValue.x * enemyValue.y) - (enemyValue.x)
        if (cornerMin <= 0 + 20) {
            isdown = true
            le = 0
        }
    }
}



let enemyShoot = () => {
    random = Math.floor(Math.random() * ((enemyValue.x * enemyValue.y - 1) - 0))
    const enemy = enemys[random]
    if (!enemy.isDead) {
        const bullet = new EnemyBullet(enemy.x + (enemy.width / 2), enemy.y + enemy.height)
        enemyBullets.push(bullet)
    }
}

let enemyCollision = () => {
    enemys.forEach(enemy => {
        let sc = 0
        if (enemy.isDead) {
            return
        }
        bullets.forEach(bullet => {
            //敵は円
            const er = enemy.width / 2
            const enemyCenterX = enemy.x + enemy.width / 2
            const enemyCenterY = enemy.y - enemy.height / 2

            /**弾は長方形(多角形)
             * 時計回り
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

            const SX = bX2 - bX1
            const SY = bY1

            const AX = bX1 - enemyCenterX
            const AY = bY1 - enemyCenterY

            //公式　 d  = |S*A|/|S|
            const sqrt = Math.sqrt((SX ** 2) + (SY ** 2))
            const a = Math.abs((SX * AY) - (SY * AX))
            const d = a / sqrt

            /*
                        const x = (bulletCenterX - enemyCenterX) ** 2
                        const y = (bulletCenterY - enemyCenterY) ** 2
                        const r = (er + br) ** 2
            */
            if (d <= er) {
                enemy.isDead = true
                bullets.splice(sc, 1)
                isShoot = true;
            }
            sc++
        })
    })
}