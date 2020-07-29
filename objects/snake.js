const SEG_SIZE = 10;
const BASE_COLOR = "#00ff00";
const STRIPE_COLOR = "#ffff00";
const NONE = "none";
const UP = "up";
const DOWN = "down"
const LEFT = "left";
const RIGHT = "right";

export function getSnake(canvas) {
    var snake = { type: "complex", speed: 2.5, dir: DOWN, nextDir: NONE, headSize: 0, parts: [] };
    snake.parts = getSegments(snake.speedx, snake.speedy);
    return snake;
}

function getSegments(canvas) {
    var xStart = 140;
    var yStart = 0;
    var tail = { type: "rectangle", x: xStart, y: yStart + SEG_SIZE * 4, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s2 = { type: "rectangle", x: xStart, y: yStart + SEG_SIZE * 5, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s3 = { type: "rectangle", x: xStart, y: yStart + SEG_SIZE * 6, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s4 = { type: "rectangle", x: xStart, y: yStart + SEG_SIZE * 7, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var head = { type: "rectangle", x: xStart, y: yStart + SEG_SIZE * 8, width: SEG_SIZE, height: 0, color: BASE_COLOR };
    return [tail, s2, s3, s4, head];
}

//The snake only moves down.  No changing directions yet.
//It does not respond to events. But the events are loaded and ready to use.
export function updateSnake(game) {

    var snake = game.snake;

    //register the next Direction.  We won't actually change directions until the current head gets to 100%
    if (snake.nextDir = NONE) {
        if (game.events.upPressed && (snake.dir == LEFT || snake.dir == RIGHT)) snake.nextDir = UP;
        if (game.events.downPressed && (snake.dir == LEFT || snake.dir == RIGHT)) snake.nextDir = DOWN;
        if (game.events.leftPressed && (snake.dir == UP || snake.dir == DOWN)) snake.nextDir = LEFT;
        if (game.events.rightPressed && (snake.dir == UP || snake.dir == DOWN)) snake.nextDir = RIGHT;
    }

    //the head increases by the speed
    snake.headSize = snake.headSize + snake.speed;
    if (snake.headSize >= SEG_SIZE) snake.headSize = SEG_SIZE;

    //subtract a little from the tail
    var tail = snake.parts[0];
    tail.y = snake.parts[0].y + snake.speed;
    tail.height = SEG_SIZE - snake.headSize;
    //add a little to the head
    var head = snake.parts[snake.parts.length - 1];
    head.height = head.height + snake.speed;

    //if the current head is 100% done, then chop of the tail piece (shift) and add a new head (push)
    //shift removes the first element of an array
    //push adds a new element to the end of the array
    if (snake.headSize == SEG_SIZE) {
        snake.parts.shift();
        var oldHead = snake.parts[snake.parts.length - 1];
        var newHead = { type: "rectangle", x: oldHead.x, y: oldHead.y + SEG_SIZE, width: SEG_SIZE, height: 0, color: BASE_COLOR };
        if (newHead.y > game.canvas.height) newHead.y = 0;
        snake.parts.push(newHead);
        snake.headSize = 0;
    }

    return snake;
}