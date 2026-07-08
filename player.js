/* ==========================================================
   Bubble Virus
   player.js
========================================================== */

const PLAYER = {

    drawing: false,

    pointerX: 0,
    pointerY: 0,

    brushRadius: 38,

    energyMax: 100,
    energy: 100,

    energyDrain: 30,      // u sekundi
    energyRecharge: 18,   // u sekundi

    shieldDuration: 10,

    protectedCount: 0

};

// ----------------------------------------------------
// Input
// ----------------------------------------------------

canvas.addEventListener("pointerdown", e => {

    PLAYER.drawing = true;

    updatePointer(e);

});

canvas.addEventListener("pointermove", e => {

    updatePointer(e);

});

window.addEventListener("pointerup", () => {

    PLAYER.drawing = false;

});

canvas.addEventListener("pointerleave", () => {

    PLAYER.drawing = false;

});

// ----------------------------------------------------

function updatePointer(e){

    const rect =
        canvas.getBoundingClientRect();

    PLAYER.pointerX =
        e.clientX - rect.left;

    PLAYER.pointerY =
        e.clientY - rect.top;

}

// ----------------------------------------------------
// Update
// ----------------------------------------------------

function updatePlayer(dt){

    if(PLAYER.drawing){

        PLAYER.energy -=
            PLAYER.energyDrain * dt;

        PLAYER.energy =
            clamp(
                PLAYER.energy,
                0,
                PLAYER.energyMax
            );

        if(PLAYER.energy>0){

            protectBrush();

        }

    }
    else{

        PLAYER.energy +=
            PLAYER.energyRecharge * dt;

        PLAYER.energy =
            clamp(
                PLAYER.energy,
                0,
                PLAYER.energyMax
            );

    }

    updateProtectedTimers();

    GAME.energy =
        Math.round(
            PLAYER.energy
        );

}

// ----------------------------------------------------

function protectBrush(){

    const r2 =
        PLAYER.brushRadius *
        PLAYER.brushRadius;

    PLAYER.protectedCount = 0;

    for(const bubble of gameBoard.bubbles){

        if(bubble.state!=="normal")
            continue;

        const dx =
            bubble.x-
            PLAYER.pointerX;

        const dy =
            bubble.y-
            PLAYER.pointerY;

        if(
            dx*dx+
            dy*dy
            <=
            r2
        ){

            bubble.state="protected";

            bubble.protectedUntil=
                performance.now()+
                PLAYER.shieldDuration*1000;

            bubble.scale=1.20;

            PLAYER.protectedCount++;

        }

    }

    GAME.protected =
        getProtectedCount();

}

// ----------------------------------------------------

function updateProtectedTimers(){

    const now=
        performance.now();

    for(const bubble of gameBoard.bubbles){

        if(
            bubble.state==="protected" &&
            bubble.protectedUntil<now
        ){

            bubble.state="normal";

            bubble.protectedUntil=0;

        }

    }

}

// ----------------------------------------------------

function playerCanProtect(){

    return PLAYER.energy>1;

}

// ----------------------------------------------------

function refillEnergy(){

    PLAYER.energy=
        PLAYER.energyMax;

}

// ----------------------------------------------------

function emptyEnergy(){

    PLAYER.energy=0;

}

// ----------------------------------------------------

function playerHit(){

    GAME.lives--;

    if(GAME.lives<=0){

        GAME.lives=0;

        GAME.paused=true;

    }

}
