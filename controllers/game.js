import {getSnake} from '../objects/snake.js';
import {getApples} from '../objects/apples.js';
// import {getStats} from '../objects/stats.js'; 

export function getGame() {
    
    // var stats = getStats();
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // var infoCenter = document.getElementById("infoCenter");
    // var infoCtx = infoCenter.getContext("2d");
    var snake = getSnake(canvas);
    var apples = getApples(canvas);
    var events = {upPressed: false, downPressed: false, leftPressed: false, rightPressed: false,
                  spacePressed:false};
    var sounds = {crunch: document.getElementById("appleCrunch")};

    var game = {gameOver: false,
                // infoCenter: infoCenter, infoCtx: infoCtx,
                canvas: canvas, ctx: ctx,
                events: events,
                sounds: sounds,
                // stats: stats,
                snake: snake,
                apples: apples
            };
    return game;
}