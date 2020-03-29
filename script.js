///////// Global Variables//////////
let sound 
let sprite 
let sprite2
let sprite3
let sprite4
let obj1
let tree3
let newTree
let tree
let floor
let app;
let player;
let enemy;
let doggy;
let titleScreen;
let gameOverScreen;
let playerSheet = {};
let background
let backgroundX = 0
let backgroundSpeed = -.5
let backgroundX2 = 0
let backgroundSpeed2 = -4
let treeX = 0
let treeSpeed = -1
let animatedSprite
let kitty
let objects
let mapSheet = {}
let dirt
let tileSize = 98
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
            width: 1200,
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
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
                this.pressed[e.key] = true
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
        .add('tree', "/cool-map.png")
        .add("tree3", "/tree-map.png")
        .add("treetest", "/Tree_3.png")
        // .add('music', "/music.wav")

    sprite = new PIXI.Sprite(app.loader.resources.tree.texture);
    sprite.interactive = true;
    sprite.hitArea = new PIXI.Rectangle(870, 0, 60, 200);
    sprite2 = new PIXI.Sprite(app.loader.resources.tree.texture);
    sprite2.interactive = true;
    sprite2.hitArea = new PIXI.Rectangle(1160, 325, 58, 200);
    // sprite3 = new PIXI.Sprite(app.loader.resources.tree.texture);
    // sprite3.interactive = true
    // sprite3.hitArea = new PIXI.Rectangle(1600, 400, 50, 300);
    // sprite4 = new PIXI.Sprite(app.loader.resources.tree.texture);
    // sprite4.interactive = true;
    // sprite4.hitArea = new PIXI.Rectangle(1800, 400, 50, 300);
   


    let treeform = new PIXI.Sprite(app.loader.resources.treetest.texture)
   mainScreen = new PIXI.Container()
   mainScreen.addChild(treeform)

sound = PIXI.Sound
    


   floor = new PIXI.Container()
        for(var i = 0; i <= 9; i += 1) {
            let sprite = new this.PIXI.Sprite(app.loader.resources.dirt.texture)
            floor.addChild(sprite)
        }


    app.loader.onComplete.add(initLevel)
    // app.loader.onStart.add(gameLoop)
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

    function drawTree() {
        tree = new PIXI.Sprite.from(app.loader.resources.treetest.texture);
        tree.x = 16
        tree.y = app.view.height / 2
        tree.anchor.set(0.5);
    }

    newTree = new PIXI.Sprite.from(app.loader.resources.background.texture);
    newTree.x = 200
    newTree.y = app.view.height / 2
    newTree.anchor.set(0.5);

    enemy = new PIXI.Sprite.from(app.loader.resources.enemy.texture);
    enemy.x = 16
    enemy.y = app.view.height / 2
    enemy.anchor.set(0.5);


    app.stage.addChild(titleScreen)
    app.stage.addChild(gameOverScreen)
    app.stage.addChild(floor);
    app.stage.addChild(mainScreen)



    window.addEventListener("keydown", keysDown)
    window.addEventListener("keyup", keysUp)
    window.addEventListener("keydown", switchContainer)


 keysDiv = document.querySelector("#keys")


    app.ticker.add(() => {
        // kitty.x = character.x
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
        if(kb.pressed.Enter) {
           gameLoop()
        }

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
    createTree(app.loader.resources["tree"].texture)
}

function createMapsheet() {
    let what = new PIXI.BaseTexture.from(app.loader.resources["tree3"].url)
    mapSheet['tree1'] = [new PIXI.Texture(what, PIXI.Rectangle(1, 1, 889, 303))]
}

function createTree1(texture) 
{
  obj1 = new PIXI.TilingSprite(texture, 1000, 800)
  obj1.position.set(0.5)
  app.stage.addChild(obj1)

  window.obj1 = obj1
}


function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, 1000, 800)
    tiling.position.set(0, 0)
    app.stage.addChild(tiling)

    window.tiling = tiling
}

function createTree(texture) {
    let tiling2 = new PIXI.TilingSprite(texture, 2000, 800)
    tiling2.position.set(0, 0)
    // tiling2.x = -300
    tiling2.y = - 100
    app.stage.addChild(tiling2)

    window.tiling2 = tiling2
}

function createDirt(texture) {
    let dirtTiling2 = new PIXI.TilingSprite(texture, 1000, 100)
    dirtTiling2.position.set(0, 0)
    dirtTiling2.x = 0
    dirtTiling2.y = 550
    app.stage.addChild(dirtTiling2)
    window.dirtTiling2 = dirtTiling2
}

function doneloadingg(e) {
    createPlayerSheet()
    createDoggySheet()
    createPlayer()
    createDoggy()
    // createMapsheet()
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
    kitty = new PIXI.AnimatedSprite(playerSheet.run)
    kitty.anchor.set(0.5);
    kitty.animationSpeed = .5;
    kitty.loop = true;
    kitty.scale.x = .75
    kitty.scale.y = .75
    kitty.x = 200
    kitty.y = 400
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


// function drawTree(texture) {
//     tree3 = new PIXI.TilingSprite(texture, 200, 200)
//     tree3.position.set(0, 0)
//     tree3.x = 800
//     tree3.y = 250
//     app.stage.addChild(tree3)
// }

function playmusic() {
    PIXI.sound.play("music")
}

function keysDown(e) {
    keys[e.keyCode] = true;
    // console.log(e.keyCode())
    doggy.loop = true
}

function keysUp(e) {
    keys[e.keyCode] = false;
    // kitty.loop = false;
    character.vx = 0
}


function gameLoop(delta) {
  
    doggy.x += 1

    sprite.hitArea.x -= 5
    sprite2.hitArea.x -= 5
    // sprite3.hitArea.x -= 5
    // sprite4.hitArea.x -= 5


  if (sprite.hitArea.x < 0) {
      resetSpriteHitArea()
  }
  if (sprite2.hitArea.x < 0) {
      resetSpriteHitArea2()
  }
//   if (sprite3.hitArea.x < 0) {
//       resetSpriteHitArea()
//   }
//   if (sprite4.hitArea.x < 0) {
//       resetSpriteHitArea2()
//   }
  
     // drawRandomTree()
    // updateHitArea()
    updateBackground()
    updateTree()
    updateDirt()

    if (rectsIntersect(kitty, sprite)) {
        console.log("hit")
       app.ticker.stop()
    }

    if (rectsIntersect2(kitty, sprite2)) {
        console.log("hit")
        app.ticker.stop()
        // gameOverScreen.visible = true
    }



    // if (rectsIntersect(kitty, dirt)) {
    // }
        //   true

    
    
   
    // if (keys["68"]) {
    // //   if(!kitty.playing) {
    // //       kitty.textures = playerSheet.run
    // //       kitty.loop = true;
    // //       kitty.animationSpeed = .5
    // //       kitty.play()
    // //       character.vx += 2
    // //     //   drawTree()
    // //     console.log("hello")    
    // }
        

// }
    
    if (keys["89"]) {
 
    }
    
    
      
    // }

    if (keys["74"]) {
          character.vy =  -16
        //   drawTree()
        //   updateTree1()
    }

    // if(keys["89"]) {
    //     doggy.textures = enemySheet.rund
    //     doggy.loop = true;
    //     doggy.animationSpeed = .5
    //     doggy.play()
    //     doggy.x += .5
    // }
}

function rectsIntersect(a,b) {
    let aBox = a.getBounds()
    let bBox = b.hitArea

    aBox.width -= 125

   window.aBox = aBox

    return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width && 
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height
}

function rectsIntersect2(a,b) {
    let aBox = a.getBounds()
    let bBox = b.hitArea

    aBox.width -= 125

   window.aBox = aBox

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
function updateDirt() {
   backgroundX2 = backgroundX2 + backgroundSpeed2
   dirtTiling2.tilePosition.x = backgroundX2
}

function updateTree() {
    backgroundX2 = backgroundX2 + backgroundSpeed2
    tiling2.tilePosition.x = backgroundX2
}

function resetSpriteHitArea() {
    sprite.hitArea.x = 1200
}
function resetSpriteHitArea2() {
    sprite2.hitArea.x = 1200
}
// function resetSpriteHitArea3() {
//     sprite3.hitArea.x = 1200
// }
// function resetSpriteHitArea4() {
//     sprite4.hitArea.x = 1200
// }


// function updateTree3() {
//     tree3.x -= 1
// }

function drawTree() {
    let newTree = new PIXI.Sprite.from(app.loader.resources.treetest.texture)
    newTree.x = Math.random(800)
    newTree.y = 400
    app.stage.addChild(newTree)
}

function updateTree1() {
    newTree.x -= 1
}


function drawRandomTree() {
    setInterval(drawTree(), 3000)
}



