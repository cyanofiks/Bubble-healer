/* ===========================================================
   Bubble Virus
   game.js
=========================================================== */

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

let width = 0;
let height = 0;

let lastTime = 0;

function resize(){

    width =
    window.innerWidth;

    height =
    window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    if(typeof createBoard==="function"){

        createBoard();

    }

}

window.addEventListener(
"resize",
resize
);

resize();

function update(dt){

    if(typeof updateBoard==="function")
        updateBoard(dt);

}

function draw(){

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    if(typeof drawBoard==="function")
        drawBoard(ctx);

}

function gameLoop(time){

    const dt =
    (time-lastTime)/1000;

    lastTime=time;

    update(dt);

    draw();

    requestAnimationFrame(
        gameLoop
    );

}

requestAnimationFrame(gameLoop);