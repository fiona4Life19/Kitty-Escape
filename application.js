
import Tree from "./components/tree.js"

export default class App {
    constructor() {
        // super({
        //     width: window.innerWidth,
        //     height: window.innerHeight
        // })
    

    document.body.appendChild(this.view)

    window.addEventListener('resize', this.onResize.bind(this))
    }


    init() {
        this.loader.draw.bind(this)
    }

    draw() {
        this.tree = new Tree()
        this.stage.addChild(this.tree)

        this.onResize()
    }
}

let 