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
            /**
             * 敵は円だから
             * 半径と中点
             * */
            const er = enemy.width / 2
            const enemyCenterX = enemy.x + enemy.width / 2
            const enemyCenterY = enemy.y + enemy.height / 2

            /**弾は長方形(多角形)
             * 時計回り
             * 1-----2
             * |     |
             * |     |
             * |     |
             * 4-----3
             */

            //多角形の頂点
            //今回は、四角だから
            const bullePosition = [{
                    x: bullet.x,
                    y: bullet.y
                },
                {
                    x: bullet.x + bullet.width,
                    y: bullet.y
                },
                {
                    x: bullet.x,
                    y: bullet.y + bullet.height
                },
                {
                    x: bullet.x,
                    y: bullet.y + bullet.height
                }
            ]
            //多角形を構成するベクトル
            const bulletVector = [{
                    x: bullePosition[1].x - bullePosition[0].x,
                    y: bullePosition[1].y - bullePosition[0].y
                },
                {
                    x: bullePosition[2].x - bullePosition[1].x,
                    y: bullePosition[2].y - bullePosition[1].y
                },
                {
                    x: bullePosition[3].x - bullePosition[2].x,
                    y: bullePosition[3].y - bullePosition[2].y

                },
                {
                    x: bullePosition[0].x - bullePosition[3].x,
                    y: bullePosition[0].y - bullePosition[3].y
                }
            ]

            //多角形の頂点から敵までのベクトル
            const vector = [{
                    x: bullePosition[0].x - enemyCenterX,
                    y: bullePosition[0].y - enemyCenterY

                },
                {
                    x: bullePosition[1].x - enemyCenterX,
                    y: bullePosition[1].y - enemyCenterY
                },
                {
                    x: bullePosition[2].x - enemyCenterX,
                    y: bullePosition[2].y - enemyCenterY
                },
                {
                    x: bullePosition[3].x - enemyCenterX,
                    y: bullePosition[3].y - enemyCenterY
                }
            ]

            const SX = bullePosition[1].x - bullePosition[0].x
            const SY = bullePosition[1].y - bullePosition[0].y

            const AX = bullePosition[0].x - enemyCenterX
            const AY = bullePosition[0].y - enemyCenterY

            const BX = bullePosition[1].x - enemyCenterX
            const BY = bullePosition[1].y - enemyCenterY


            //公式　 d  = |S*A|/|S|
            const sqrt = Math.sqrt((SX ** 2) + (SY ** 2))

            const d = (Math.abs((SX * AY) - (SY * AX))) / sqrt

            const A = Math.abs((AX ** 2) + (AY ** 2))
            const B = Math.abs((BX ** 2) + (BY ** 2))

            if (d <= er) {
                const DotAS = (AX * SX) + (AY * SY)
                const DotBS = (BX * SX) + (BY * SY)
                if (DotAS * DotBS <= 0 || A < er || B < er) {
                    enemy.isDead = true
                    bullets.splice(sc, 1)
                    isShoot = true
                }
            }
            sc++
        })
    })
}