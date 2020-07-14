
const SEG_SIZE = 5;
const BASE_COLOR = "#00ff00";
const STRIPE_COLOR = "#ffff00";

export function getSnake(canvas) {

    var snake = { type: "complex", speedX: 0, speedY: .5, parts: [] };
    snake.parts = getSegments(snake.speedX, snake.speedY);
    return snake;
}

//This will be the starter snake
function getSegments(canvas) {
    var s1 = { type: "rectangle", x: SEG_SIZE * 50, y: SEG_SIZE * 4, parts: [], width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s2 = { type: "rectangle", x: SEG_SIZE * 50, y: SEG_SIZE * 5, parts: [], width: SEG_SIZE, height: SEG_SIZE, color: STRIPE_COLOR };
    var s3 = { type: "rectangle", x: SEG_SIZE * 50, y: SEG_SIZE * 6, parts: [], width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    return [s1, s2, s3];
}

export function updateSnake(snake) {

    for (var i = 0; i < snake.parts.length; i++) {
        var segment = snake.parts[i];
        segment.y = segment.y + snake.speedY;
        var parts = segment.parts;
    }
    return snake;
}