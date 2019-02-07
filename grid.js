//grid.js

//draws grid corresponding with CPs
function createGrid()
{
    var ctx = document.getElementById("gameScreen").getContext('2d');
    ctx.beginPath();    //reduces lag       
    ctx.strokeStyle = "white";
    for(w = 0; w < GAME_SCREEN_WIDTH; w += GRID_SIZE)
    {
        for(h = 0; h < GAME_SCREEN_HEIGHT; h += GRID_SIZE)
        {
            //draws line every 128 px in either direction
            ctx.moveTo(w, 0);
            ctx.lineTo(w, GAME_SCREEN_WIDTH);
            ctx.stroke();
            ctx.moveTo(0, h);
            ctx.lineTo(GAME_SCREEN_HEIGHT, h);
            ctx.stroke();
        }
    }
    ctx.closePath();
}