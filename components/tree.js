
export default class Tree extends TilingSprite {
    constructor() {
        const texture = Texture.from("/images/Tree.png")
        super(texture, 1, texture.height)
    }


    onResize(width, height) {
        this.width = width
    }

    onUpdate(delta) {
        this.tilePosition.x -= delta * 4
    }
}