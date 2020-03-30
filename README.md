# README

# Kitty-Escape

[Kitty Escape Live](https://fiona4life19.github.io/Kitty-Escape/)

Kitty Escape is a Javascript web-based game that features PixiJs as the graphics engine. The theme of the game is an infinite runner in which the player must jump to avoid obstacles

# Features and Implementation 

## Animations

Kitty Escape features two character each with their own animations that give the illusion that they are moving against the scrolling background. 

![Animations](/images/animations.png) 


## Gravity

Kitty Escape implements a system of gravity and collision to test the users timing in jumping over the tree and crate obstacles.

![Gravity](images/jumping.png) 

# Challanges

## Animations

One of my main challenges was learning how to give the characters/sprites animations. I installed a program call texture packer which created a JSON file to allow me to crop the perfect rectangle of 8 frame animations for the cat and dog.

```Javascript
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
```

## Collision Testing

Another one of my main challanges was collision testing. I had to incoorperate collision testing for moving objects as well as the stationary objects like the floor.

```Javascript
function gameLoop(delta) {
  
    sprite.hitArea.x -= 5
    sprite2.hitArea.x -= 5
    
  if (sprite.hitArea.x < 0) {
      resetSpriteHitArea()
  }
  if (sprite2.hitArea.x < 0) {
      resetSpriteHitArea2()
  }
```

```Javascript
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
```

# Future Directions 

* Level Design - A User will have the option between three levels, easy, medium, and hard.
       
* Stop, Reset - The user will be able to pause and restart the game

* Sound - There will be sound graphics for the main game screen and for each jump.  



