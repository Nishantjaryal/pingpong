const playerScoreEle = document.getElementById("plyr_scr")
const ComputerScoreEle = document.getElementById("comp_scr")




const INIT_VELOCITY = .03;
const ACC_RATE  = 0.00000000001;

export default class Ball{
    constructor(elem){
        this.elem = elem;
        this.reset()
    }

    // we can access elem here in the form of this.elem



    //helper function 
    get x(){
        return parseFloat(getComputedStyle(this.elem).getPropertyValue("--x"))
    }
    get y(){
        return parseFloat(getComputedStyle(this.elem).getPropertyValue("--y"))
    }
    set x(val){
        this.elem.style.setProperty("--x",val)
    }
    set y(val){
        this.elem.style.setProperty("--y",val)
    }


    rect(){
        return this.elem.getBoundingClientRect()
    }

    
    reset(){
        this.x = 50
        this.y = 50
        this.direction = {x:0}


        while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .8){
            const heading = randomNumberBetween(0,2*Math.PI);
            this.direction = {
                x: Math.cos(heading),
                y: Math.sin(heading)
            }
        }


        this.velocity = INIT_VELOCITY;

    }

    manageHits(paddle,ball) {
        if(paddle.right <= ball.left && ball.top*1.2 >= paddle.top && ball.bottom <= paddle.bottom*1.2){
            this.direction.x *= -1;
        }
        
        if(paddle.left <= ball.right && ball.top*1.2 >= paddle.top && ball.bottom <= paddle.bottom*1.2){
            this.direction.x *= -1;
        }
    }
    
    
    update(delta){
        this.x += this.direction.x*this.velocity*delta;
        this.y += this.direction.y*this.velocity*delta;
        this.velocity += ACC_RATE;



        const rect = this.rect()


        if(rect.right >= window.innerWidth){
            playerScoreEle.textContent = parseInt( playerScoreEle.textContent)+1;
        }else if(rect.left <= 0){
            ComputerScoreEle.textContent = parseInt(ComputerScoreEle.textContent)+1;
        }


        if(rect.bottom >= window.innerHeight || rect.top <=0){
            this.direction.y *= -1;
        }
        if(rect.right >= window.innerWidth || rect.left <=0){
            this.direction.x *= -1;
        }



        

    }



    lose(){
        const rect = this.rect();
        return (rect.right >= window.innerWidth || rect.left <=0)
    }

    
   

}

function randomNumberBetween(min,max){
    return Math.random()*(max-min) + min;
}

// check lose function --> if touches the boundary