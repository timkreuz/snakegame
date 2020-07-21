import {getSnake} from '../objects/snake.js';
// import {getStats} from '../objects/stats.js'; 

export function getGame() {
    
    // var stats = getStats();
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // var infoCenter = document.getElementById("infoCenter");
    // var infoCtx = infoCenter.getContext("2d");
    var snake = getSnake(canvas);
    var events = {upPressed: false, downPressed: false, leftPressed: false, rightPressed: false,
                  spacePressed:false};

    var game = {gameOver: false,
                // infoCenter: infoCenter, infoCtx: infoCtx,
                canvas: canvas, ctx: ctx,
                events: events,
                // stats: stats,
                snake: snake};
    return game;
}