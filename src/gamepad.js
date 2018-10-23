let gamepadAPI = {
    controller: {},
    turbo: false,
    connect: (e) => {
        //gamepadAPI.controller = e.gamepad
        gamepadAPI.turbo = true
        console.log("Gamepad connected.")
    },
    disconnect: (e) => {
        gamepadAPI.turbo = false
        delete gamepadAPI.controller
        console.log('Gamepad disconnected.')
    },
    update: () => {
        //コントローラーの更新
        gamepadAPI.controller = navigator.getGamepads()[0]

        //cache クリア
        gamepadAPI.buttonsCache = []
        //cacheにstatusを保存
        gamepadAPI.buttonsStatus.forEach(buttonstatus => {
            gamepadAPI.buttonsCache.push(buttonstatus)
        })

        //status　クリア
        gamepadAPI.buttonsStatus = []
        //ゲームパット　オブジェクト　を取得
        let c = gamepadAPI.controller || {}

        //押されたボタンを格納
        let pressed = []
        if (c.buttons) {
            for (var b = 0; b < c.buttons.length; b++) {
                if (c.buttons[b].pressed) {
                    //pressed.push(gamepadAPI.buttons[b]) 
                    pressed[gamepadAPI.buttons[b]] = true
                }

            }
        }
        //アナログパッドの値を格納
        let axes = []
        if (c.axes) {
            for (let a = 0; a < c.axes.length; a++) {
                axes.push(c.axes[a].toFixed(1))
            }
        }

        //それぞれの値を割り当てる
        gamepadAPI.axesStatus = axes
        gamepadAPI.buttonsStatus = pressed

        //デバック用に値を返す
        return pressed
    },
    buttonPressed: (button, hold) => {
        let newPress = false
        for (let i = 0; i < gamepadAPI.buttonsStatus.length; i++) {
            if (gamepadAPI.buttonsStatus[i] == button) {

                newPress = true

                if (!hold) {
                    for (let j = 0; j < gamepadAPI.buttonPressed.length; j++) {
                        if (gamepadAPI.buttonsCache[j] = button) {
                            newPress = false
                        }

                    }
                }

            }
        }
        return newPress
    },
    //ボタンの配置を格納(ps4)
    buttons: [
        //0から順に格納
        //A = × ,B =○ ,X =□ ,Y =△  は記号が使えない為Xboxに従う
        "A", "B", "X", "Y", "L1", "R1", "L2", "R2", "share",
        "options", "L3", "R3", "up", "down", "left", "right", "PS", "pad"
    ],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: []
}

//差し込み時
window.addEventListener("gamepadconnected", gamepadAPI.connect)

//取り出し時
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect)