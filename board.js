/* ==========================================================
   Bubble Virus
   board.js
========================================================== */

const board = {

    bubbles:[],

    cols:0,

    rows:0,

    size:0,

    margin:12,

    floatTime:0

};



class Bubble{

    constructor(row,col,x,y,r){

        this.row=row;

        this.col=col;

        this.x=x;

        this.y=y;

        this.radius=r;

        this.state="normal";

        this.timer=0;

        this.offset=Math.random()*Math.PI*2;

    }

    update(dt){

        this.timer+=dt;

    }

    draw(ctx){

        let y=
        this.y+
        Math.sin(
            board.floatTime+
            this.offset
        )*2;

        // shadow

        ctx.beginPath();

        ctx.fillStyle="rgba(0,0,0,.18)";

        ctx.arc(
            this.x+2,
            y+4,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

        // bubble

        const g=
        ctx.createRadialGradient(

            this.x-this.radius*.4,

            y-this.radius*.5,

            this.radius*.2,

            this.x,

            y,

            this.radius

        );

        g.addColorStop(
            0,
            "#ffffff"
        );

        g.addColorStop(
            .3,
            "#dff7ff"
        );

        g.addColorStop(
            1,
            "#6bc4ff"
        );

        ctx.beginPath();

        ctx.fillStyle=g;

        ctx.arc(

            this.x,

            y,

            this.radius,

            0,

            Math.PI*2

        );

        ctx.fill();

        // reflection

        ctx.beginPath();

        ctx.fillStyle="rgba(255,255,255,.75)";

        ctx.arc(

            this.x-this.radius*.35,

            y-this.radius*.35,

            this.radius*.22,

            0,

            Math.PI*2

        );

        ctx.fill();

    }

}



function createBoard(){

    board.bubbles=[];

    const usableWidth=
    width-30;

    const usableHeight=
    height-30;

    board.cols=
    Math.floor(
        usableWidth/48
    );

    board.rows=
    Math.floor(
        usableHeight/48
    );

    board.size=
    Math.min(

        usableWidth/
        board.cols,

        usableHeight/
        board.rows

    );

    const r=
    board.size*.42;

    const startX=
    (width-
    board.cols*
    board.size)/2;

    const startY=
    (height-
    board.rows*
    board.size)/2;

    for(

        let row=0;

        row<board.rows;

        row++

    ){

        for(

            let col=0;

            col<board.cols;

            col++

        ){

            board.bubbles.push(

                new Bubble(

                    row,

                    col,

                    startX+
                    col*
                    board.size+
                    board.size/2,

                    startY+
                    row*
                    board.size+
                    board.size/2,

                    r

                )

            );

        }

    }

}



function updateBoard(dt){

    board.floatTime+=dt*2;

    for(

        const b

        of

        board.bubbles

    ){

        b.update(dt);

    }

}



function drawBoard(ctx){

    for(

        const b

        of

        board.bubbles

    ){

        b.draw(ctx);

    }

}
