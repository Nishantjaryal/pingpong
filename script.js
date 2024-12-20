// update loop 

import Ball from './ball.js'
import Paddle from './paddle.js'
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("plyr_paddle"))
const compPaddle = new Paddle(document.getElementById("comp_paddle"))





let lasttime;
function update(time) {




    if(lasttime!=null){
        const delta  = time - lasttime;


        // update code
        ball.update(delta)

        if(ball.x>=80){
            compPaddle.update(delta, ball.y)
        }



        

       ball.manageHits(playerPaddle.rect(),ball.rect())
       ball.manageHits(compPaddle.rect(),ball.rect())





        if(ball.lose()){
            console.log("lost")
            // losing code
            ball.reset()
            compPaddle.reset()
        }
        

    }
    lasttime  = time;
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)




document.addEventListener('mousemove', e=>{
    playerPaddle.position = e.y/window.innerHeight * 100 // px -> vh
})


