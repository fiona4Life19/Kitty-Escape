///////// Global Variables//////////

let app;
let player;
let enemy;
let doggy;
let titleScreen;
let gameOverScreen;
let playerSheet = {};
let background
let backgroundX = 0
let backgroundSpeed = -1
let animatedSprite
let kitty
let objects
let mapSheet = {}
let dirt
let tileSize = 96
let speed = 1
let enemySheet = {}
let character = {
    x: 0, y: 0,
    vx: 0, vy: 0
}

//Canvas//////////////////////

window.onload = function () {
    app = new PIXI.Application(
        {
            width: 1000,
            height: 800,
            backgroundColor: 0xAAAAAA
        }
    );



    // let kb = new Keyboard()
    document.body.appendChild(app.view)
    app.view.setAttribute("tabIndex", 0)

    this.document.querySelector('#game-div').appendChild(app.view)



    map = {
        width: 16,
        height: 10,
        tiles: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        collision: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ]
    }

    function testCollision(worldX, worldY) {
        let mapX = Math.floor(worldX / tileSize )
        let mapY = Math.floor(worldY / tileSize )
        return map.collision[mapY * map.width + mapX]

    }

    class Keyboard {
        constructor() {
            this.pressed = {}
        }

        watch(el) {
            el.addEventListener("keydown", (e) => {
                this.pressed[e.key] = true
            })
            el.addEventListener("keyup", (e) => {
                this.pressed[e.key] = false
            })
        }
    }

    document.body.appendChild(app.view)
    app.view.setAttribute("tabIndex", 0)

    let kb = new Keyboard()
    kb.watch(app.view)




    //////////////////////////////////
    //preload assets

    app.loader.baseUrl = "images";
    app.loader
        .add("player", "/player.png")
        .add("enemy", "/doggy.png")
        .add('background', "/BG.png")
        .add("kitty", "/kitty.png")
        .add("objects", "/environment_objects.png")
        .add("dirt", "2.png")
        // .add('doggy', "/doggy.png")


    app.loader.onComplete.add(initLevel)
    app.loader.load()
    app.loader.load(doneloadingg)

    app.loader.onProgress.add(showProgress)
    app.loader.onComplete.add(doneLoading)
    app.loader.onError.add(reportErrors)



    ///////////////////////////////

    

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



function doneLoading(e) {
    console.log("DONE LOADING!")

    objects = new PIXI.Sprite.from(app.loader.resources.objects.texture)

    // player = new PIXI.Sprite.from(app.loader.resources.player.texture);
    // player.x = 600
    // player.y = app.view.height / 2
    // player.anchor.set(0.5);

    // background = new PIXI.Sprite.from(app.loader.resources.background.texture);
    // background.x = 200
    // background.y = app.view.height / 2
    // background.anchor.set(0.5);

    // enemy = new PIXI.Sprite.from(app.loader.resources.enemy.texture);
    // enemy.x = 16
    // enemy.y = app.view.height / 2
    // enemy.anchor.set(0.5);


    app.stage.addChild(titleScreen)
    app.stage.addChild(gameOverScreen)
    // app.stage.addChild(enemy);
    // app.stage.addChild(player)



    window.addEventListener("keydown", keysDown)
    window.addEventListener("keyup", keysUp)
    window.addEventListener("keydown", switchContainer)


 keysDiv = document.querySelector("#keys")



    app.ticker.add(() => {
        kitty.x = character.x
        kitty.y = character.y

        character.vy = character.vy + 1;
        character.x += character.vx;

    if (character.vy > 0) {
        for (let i = 0; i < character.vy; i++) {
            let testX1 = character.x / tileSize
            let testX2 = character.x + tileSize - 1
            let testY = character.y + tileSize * 2
            if (testCollision(testX1, testY || testCollision(testX2, testY1))) {
                character.vy = 0;
                break
            }
            character.y = character.y + 1;
        }
    }

        if (character.vy < 0) {
            character.y += character.vy
        }

        if (kb.pressed.ArrowUp) {
            character.vy = -10
        }

        // if (kb.pressed.ArrowRight) {
        //     character.vx += 2
        // }

        // if (character.vx > 0) {
        //     character.vx -= 1
        // }
        // if (character.vx < 0) {
        //     character.vx += 1
        // }



        })
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

    background = createBg(app.loader.resources["background"].texture)
    let dirt = createDirt(app.loader.resources["dirt"].texture)
    createDirt2(app.loader.resources["dirt"].texture)
    createDirt3(app.loader.resources["dirt"].texture)
    createDirt4(app.loader.resources["dirt"].texture)
    createDirt5(app.loader.resources["dirt"].texture)
    createDirt6(app.loader.resources["dirt"].texture)
    createDirt7(app.loader.resources["dirt"].texture)
    createDirt8(app.loader.resources["dirt"].texture)
    createDirt9(app.loader.resources["dirt"].texture)
    createDirt10(app.loader.resources["dirt"].texture)

    window.background = background
    window.dirt = dirt
}

function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, 1000, 800)
    tiling.position.set(0, 0)
    app.stage.addChild(tiling)

    window.tiling = tiling
}

function createDirt(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 0
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt2(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 100
    dirt.y = 550
    app.stage.addChild(dirt)

    window.dirt = dirt
}

function createDirt3(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 200
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt4(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 300
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt5(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 400
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt6(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 500
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt7(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 600
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt8(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 700
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt9(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 800
    dirt.y = 550
    app.stage.addChild(dirt)
}

function createDirt10(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 900
    dirt.y = 550
    app.stage.addChild(dirt)
}


function createDirt2(texture) {
    let dirt = new PIXI.TilingSprite(texture, 100, 100)
    dirt.position.set(0, 0)
    dirt.x = 100
    dirt.y = 550
    app.stage.addChild(dirt)
}
 

function doneloadingg(e) {
    createPlayerSheet()
    createDoggySheet()
    createPlayer()
    createDoggy()
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

function createDoggySheet() {
    let otherSheet = new PIXI.BaseTexture.from(app.loader.resources["enemy"].url)

    enemySheet["stand"] = [
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(112, 1, 109, 164))
    ]

    enemySheet["run"] = [
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(113, 167, 109, 161)),
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(335, 167, 109, 152)),
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(224, 167, 110, 161)),
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(1, 1, 109, 164)),
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(223, 1, 109, 164)),
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(1, 168, 110, 157)),
        new PIXI.Texture(otherSheet, new PIXI.Rectangle(334, 1, 109, 164)),
    ]
}


function createPlayer() {
    kitty = new PIXI.AnimatedSprite(playerSheet.stand)
    kitty.anchor.set(0.5);
    kitty.animationSpeed = .5;
    kitty.loop = false;
    kitty.x = 200
    kitty.y = app.view.height / 1.65;
    app.stage.addChild(kitty)
    kitty.play()     
}

function createDoggy() {
    doggy = new PIXI.AnimatedSprite(enemySheet.stand)
    doggy.anchor.set(0.5);
    doggy.animationSpeed = .5;
    doggy.x = app.view.width / 8;
    doggy.y = app.view.height / 1.65;
    app.stage.addChild(doggy)
    doggy.play()     
}



function keysDown(e) {
    keys[e.keyCode] = true;
    doggy.loop = true
}

function keysUp(e) {
    keys[e.keyCode] = false;
    kitty.loop = false;
    character.vx = 0
}

function gameLoop(delta) {
    doggy.x += 1

    // if (rectsIntersect(enemy, kitty)) {
    //    speed = 0
    // }
    // if (rectsIntersect(kitty, dirt)) {
    // }
    
    
   
    if (keys["68"]) {
      if(!kitty.playing) {
          kitty.textures = playerSheet.run
          kitty.loop = true;
          kitty.animationSpeed = .5
          kitty.play()
          character.vx += 2
        //   if (character.vx > 0) {
        //       character.vx -= 1
        //   }
        //   if (character.vx < 0) {
        //       character.vx += 1
        //   }
        
      }
      updateBackground()
    //   kitty.x += speed
    }

    if(keys["13"]) {
          kitty.vy =  -10
    }

    if(keys["89"]) {
        doggy.textures = enemySheet.run
        doggy.loop = true;
        doggy.animationSpeed = .5
        doggy.play()
        doggy.x += 1
    }
}

function rectsIntersect(a,b) {
    let aBox = a.getBounds()
    let bBox = b.getBounds()

    return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width && 
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height
}

function showProgress(e) {
    console.log(e.progress)
}

function reportErrors(e) {
    console.log("ERROR: " + e.message)
}

function updateBackground() {
   backgroundX = backgroundX + backgroundSpeed
   tiling.tilePosition.x = backgroundX
}


