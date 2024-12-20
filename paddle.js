

export default class Paddle{
    constructor(Paddle_elem){
        this.elem = Paddle_elem
        this.reset();
    }

    rect(){
        return this.elem.getBoundingClientRect()
    }

    get position(){
        return parseFloat(getComputedStyle(this.elem).getPropertyValue("--position"))
    }
    set position(val){
        this.elem.style.setProperty("--position",val)
    }

    reset(){
        this.position = 50;
    }

    update(delta,ballHeight){
        this.position = ballHeight+(delta*0.1) // delta add a little inaccuracy in the model
    }
}