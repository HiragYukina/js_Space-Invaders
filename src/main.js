let canvas
let ctx
let image
let player
let enemys = []
let gameMode = "game"
let time = {
    currentTime: null,
    lastTime: null
}

let enemyValue = {
    x: 11,
    y: 5
}
let key = {
    a: false,
    w: false,
    d: false,
    s: false,
    e: false
}


let init = () => {
    canvas = document.querySelector("#mainCanvas")
    ctx = canvas.getContext("2d")


    //playerの生成
    player = new Player()

    //敵の生成 55体(11*5)
    for (let i = 0; i < enemyValue.y; i++) {
        for (let j = 0; j < enemyValue.x; j++) {
            //間隔
            const interval = 10
            //敵の大きさ
            const w = 32
            const h = 32
            //大体真ん中
            const initPosiX = (canvas.width / 2) - ((enemyValue.x / 2) *( w+10))
            const initPosiY = 100
            const x = j * w + j * interval + initPosiX
            const y = i * h + i * interval + initPosiY
            const enemy = new Enemy(x, y)
            enemys.push(enemy)
        }
    }

    image = new Image()
    image.src = "images/EDGE1.png"
    image.onload = () => {
        update()
    }
}

let update = (newTime) => {
    time.currentTime = newTime
    gamepadAPI.update()
    requestAnimationFrame(update)
    game()
    render()
}

let render = () => {
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //背景を黒に（宇宙にしたいな）
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    switch (gameMode) {
        case "title":
            break
        case "game":
            gameRender()
            break
        case "clear":

            break
        case "over":

            break
    }
}

let game = () => {
    switch (gameMode) {
        case "title":

            break
        case "game":
            mainGame()
            break
        case "clear":

            break
        case "over":
            console.log("＼(^o^)／ｵﾜﾀ");

            break
    }
}


window.addEventListener("DOMContentLoaded", init)

//キー入力
document.addEventListener("keydown", e => {
    if (key[e.key] === false) {
        key[e.key] = true
    }
})

document.addEventListener("keyup", e => {
    if (key[e.key] === true) {
        key[e.key] = false
    }
})