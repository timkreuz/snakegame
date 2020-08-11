
const APPLE_COUNT = 10;
const APPLE_SIZE = 10;
const APPLE_RED = "#e60000";
const URANIUM = "#ffff00";
const POISON = " #55ff00";

export function getApples(canvas) {
    var apples = {type: "complex", parts: []};
    for (var i=0; i < APPLE_COUNT; i++) {
        apples.parts.push(getApple(canvas, apples));
    }
    return apples;
}

function getApple(canvas, apples) {

    var x  = (Math.floor(Math.random() * (canvas.width/APPLE_SIZE))) * APPLE_SIZE;
    var y  = (Math.floor(Math.random() * (canvas.height/APPLE_SIZE))) * APPLE_SIZE;

    var apple = {type: "circle", hide: false, x: x, y: y, width: APPLE_SIZE, height: APPLE_SIZE, color: APPLE_RED};
    return apple;
}

