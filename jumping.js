

let bunny
let mapSheet = {}
let playerSheet = {}



window.onload = function() {
    const app = new PIXI.Application({
        width: 800, 
        height: 600, 
        backgroundColor: 0xAAAAAAA
    });

let tileSize = 50;
// const SCALE = 3.5;

map = {
    width: 16, 
    height: 9, 
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


document.body.appendChild(app.view);
app.view.setAttribute("tabIndex", 0)


app.loader
    .add("dirt", "/images/test.png").load((loader, resources) => {

        let kb = new Keyboard()
        kb.watch(app.view)


 

// let sSheet = new PIXI.BaseTexture.from(app.loader.resources["dirt"].url)
// mapSheet["ground"] = new PIXI.Texture(sSheet, new PIXI.Rectangle(67, 342, 64, 64))



// bunny = 

// bunny.scale.x = 2
// bunny.scale.y = 2

// Create a new texture

// Create a 5x5 grid of bunnies

// bunny.x = app.renderer.width / 2
// bunny.y = app.renderer.height / 2

// bunny.anchor.x = 0.5
// bunny.anchor.y = 0.5


background = new PIXI.Container()
for (let y = 0; y < map.width; y++) {
    for (let x = 0; x < map.width; x++) {
    map.tiles[y * map.width + x]
    // new PIXI.BaseTexture.from(app.loader.resources["tileset"].url)
    //     mapSheet["dirt"] = new PIXI.Texture(sSheet, new PIXI.Rectangle(266, 246, 25, 21))
    let sprite = new PIXI.Sprite.from(app.loader.resources.dirt.texture)
    sprite.x = 1 + 25;
    sprite.y = 1 + 25;
    background.addChild(sprite)
    app.stage.addChild(background)
    }
}

// blob.scale = 



    let ground = new PIXI.Sprite(mapSheet["ground"])
    ground.x = 20
    ground.y = 400

    app.stage.addChild(ground)


        let character = {
            x: 0, y: 0,
            vx: 0, vy: 0
        }


app.ticker.add((delta) => {
    background.x = character.x
    background.y = character.y

    character.vy = character.vy + 1;
    character.x += character.vx;


    // let touchingGround = testCollision(
    //     character.x, 
    //     character.y + tileSize * 2 + 1
    // )
    

    if(character.vy > 0) {
        for(let y = 0; y < character.vy; y += 1) {
            let testX1 = character.x / tileSize
            let testX2 = character.x + tileSize - 1
            let testY1 = character.y + tileSize * 2
                if (testCollision(testX1, testY1) || testCollision(testX2, testY1)) {
                    character.vy = 0
                    break
                }
            character.y = character.y + 1
        }
    }

    if(character.vy < 0) {
        character.y += character.vy
    }

    if(kb.pressed.ArrowUp) {
        character.vy = -10
    }

    // if(!touchingGround)
    //     dirt.texture = playerSheet.run
    //     dirt.loop = true;
    //     dirt.play()





   
        // let sSheet = new PIXI.BaseTexture.from(app.loader.resources[""].url)

        // playerSheet["stand"] = [
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(1, 1, 110, 161))
        // ]

        // playerSheet["run"] = [
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(113, 1, 108, 159)),
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(1, 164, 108, 148)),
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(223, 1, 107, 149)),
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(221, 162, 107, 150)),
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(330, 152, 107, 149)),
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(111, 164, 108, 148)),
        //     new PIXI.Texture(sSheet, new PIXI.Rectangle(332, 1, 107, 149)),
        // ]


  
 


});

})
    app.loader.onError.add((...args) => console.log(args))

}





 


