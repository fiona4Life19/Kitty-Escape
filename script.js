///////// Global Variables//////////

let app;
let player;
let enemy;
let titleScreen;
let gameOverScreen;
let playerSheet = {};
let background
let backgroundX = 0
let backgroundSpeed = 1
let animatedSprite
let speed = 2
// let kitty

//Canvas//////////////////////

window.onload = function () {
    app = new PIXI.Application(
        {
            width: 1000,
            height: 800,
            backgroundColor: 0xAAAAAA
        }
    );

    document.body.appendChild(app.view)
    this.document.querySelector('#game-div').appendChild(app.view)

    //////////////////////////////////
    //preload assets

    app.loader.baseUrl = "images";
    app.loader
        .add("player", "/player.png")
        .add("enemy", "/enemy.png")
        .add('background', "/BG.png")
        .add("kitty", "/kitty.png")
        .add("objects", "/environment_objects.png")


    app.loader.onComplete.add(initLevel)
    app.loader.load()
    app.loader.load(doneloadingg)

    app.loader.onProgress.add(showProgress)
    app.loader.onComplete.add(doneLoading)
    app.loader.onError.add(reportErrors)


    //////////////////////////////////
    //Containers

    titleScreen = new PIXI.Container()
    gameBackground = new PIXI.Container()
    gameOverScreen = new PIXI.Container()

    gameBackground.visible = false;
    gameOverScreen.visible = false;

    let redRect = new PIXI.Graphics()
    redRect.beginFill(0x00FF00)
    redRect.drawRect(0, 0, app.view.width, app.view.height);
    titleScreen.addChild(redRect)


    let blueRect = new PIXI.Graphics()
    blueRect.beginFill(0x0000FF)
    blueRect.drawRect(0, 0, app.view.width, app.view.height);
    gameOverScreen.addChild(blueRect)


    let text1 = new PIXI.Text("Kitty Escape Click 2 to start")
    text1.anchor.set(0.5)
    text1.x = app.view.width / 2
    text1.y = app.view.height / 2
    text1.style = new PIXI.TextStyle({
        fill: 0x00000,
        fontSize: 40,
        fontStyle: "Arcade",
        fontStyle: "bold",
        stroke: 0xFFFFFF,
        strokeThickness: 3
    })

    let text2 = new PIXI.Text("Start")
    text2.anchor.set(0.5)
    text2.x = app.view.width / 2
    text2.y = app.view.height / 2
    text2.style = new PIXI.TextStyle({
        fill: 0x00000,
        fontSize: 40,
        fontStyle: "Arcade",
        fontStyle: "bold",
        stroke: 0xFFFFFF,
        strokeThickness: 3
    })

    let text3 = new PIXI.Text("Game Over Click 2 to Restart")
    text3.anchor.set(0.5)
    text3.x = app.view.width / 2
    text3.y = app.view.height / 2
    text3.style = new PIXI.TextStyle({
        fill: 0x00000,
        fontSize: 40,
        fontStyle: "Arcade",
        fontStyle: "bold",
        stroke: 0xFFFFFF,
        strokeThickness: 3
    })


    titleScreen.addChild(text1)
    gameBackground.addChild(text2)
    gameOverScreen.addChild(text3)
}


function doneLoading(e) {
    console.log("DONE LOADING!")


    player = new PIXI.Sprite.from(app.loader.resources.player.texture);
    player.x = 600
    player.y = app.view.height / 2
    player.anchor.set(0.5);

    // background = new PIXI.Sprite.from(app.loader.resources.background.texture);
    // background.x = 200
    // background.y = app.view.height / 2
    // background.anchor.set(0.5);

    enemy = new PIXI.Sprite.from(app.loader.resources.enemy.texture);
    enemy.x = 16
    enemy.y = app.view.height / 2
    enemy.anchor.set(0.5);


    app.stage.addChild(titleScreen)
    app.stage.addChild(gameOverScreen)
    app.stage.addChild(enemy);



    window.addEventListener("keydown", keysDown)
    window.addEventListener("keyup", keysUp)
    window.addEventListener("keydown", switchContainer)


 keysDiv = document.querySelector("#keys")


}
////////////////////////////////////

// game functions

function runGameLoop(e) {
    if(keys["18"]) {
        app.stage.addChild(player)
        app.stage.addChild(enemy)
        return player
    }
}


function switchContainer(e) {
    switch (e.key) {
        case "1":
            titleScreen.visible = true;
            gameBackground.visible = false;
            gameOverScreen.visible = false;
            break
        case "2":
            titleScreen.visible = false;
            gameBackground.visible = true;
            gameOverScreen.visible = false;
            break
        case "3":
            titleScreen.visible = false;
            gameBackground.visible = false;
            gameOverScreen.visible = true;
            break;
    }
}


function initLevel() {
    bgBack = createBg(app.loader.resources["background"].texture)
}

function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, 1000, 800)
    tiling.position.set(0, 0)
    app.stage.addChild(tiling)
}


function doneloadingg(e) {
    createPlayerSheet()
    createPlayer()
    app.ticker.add(gameLoop)
}

function createPlayerSheet() {
    let sSheet = new PIXI.BaseTexture.from(app.loader.resources["kitty"].url)

    playerSheet["stand"] = [
        new PIXI.Texture(sSheet, new PIXI.Rectangle(1, 1, 110, 161))
    ]

    playerSheet["run"] = [
        new PIXI.Texture(sSheet, new PIXI.Rectangle(113, 164, 109, 157)),
        new PIXI.Texture(sSheet, new PIXI.Rectangle(336, 1, 108, 147)),
        new PIXI.Texture(sSheet, new PIXI.Rectangle(1, 164, 110, 157)),
        new PIXI.Texture(sSheet, new PIXI.Rectangle(113, 1, 110, 161)),
        new PIXI.Texture(sSheet, new PIXI.Rectangle(225, 1, 109, 159)),
        new PIXI.Texture(sSheet, new PIXI.Rectangle(224, 164, 108, 152)),
        new PIXI.Texture(sSheet, new PIXI.Rectangle(334, 162, 109, 159)),
    ]
}


function createPlayer() {
    kitty = new PIXI.AnimatedSprite(playerSheet.stand)
    kitty.anchor.set(0.5);
    kitty.animationSpeed = .5;
    kitty.loop = false;
    kitty.x = app.view.height / 2;
    kitty.y = app.view.height / 2;
    app.stage.addChild(kitty)
    kitty.play()
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
    kitty.loop = false;
}

function gameLoop() {

    enemy.x += 1
   
    if (keys["68"]) {
      if(!kitty.playing) {
          kitty.textures = playerSheet.run
          kitty.loop = true;
          kitty.animationSpeed = .5
          kitty.play()
      }
      kitty.x += speed
    }

    if (rectsIntersect(player, enemy)) {
    
    }
}

function rectsIntersect(a, b) {
    let aBox = a.getBounds()
    let bBox = b.getBounds()

    return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width
}

function showProgress(e) {
    console.log(e.progress)
}

function reportErrors(e) {
    console.log("ERROR: " + e.message)
}


