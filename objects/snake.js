
const SEG_SIZE = 10;
const BASE_COLOR = "#00ff00";
const STRIPE_COLOR = "#ffff00";
const NONE = "none";
const UP = "up";
const DOWN = "down"
const LEFT = "left";
const RIGHT = "right";

export function getSnake(canvas) {
    var snake = { type: "complex", speed: .5, dir: DOWN, nextDir: NONE, headSize:0, parts: [] };
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

export function updateSnake(game) {

    var snake = game.snake;

    if (snake.nextDir = NONE) {
        if (game.events.upPressed && (snake.dir == LEFT || snake.dir == RIGHT)) snake.nextDir = UP;
        if (game.events.downPressed && (snake.dir == LEFT || snake.dir == RIGHT)) snake.nextDir = DOWN;
        if (game.events.leftPressed && (snake.dir == UP || snake.dir == DOWN)) snake.nextDir = LEFT;
        if (game.events.rightPressed && (snake.dir == UP || snake.dir == DOWN)) snake.nextDir = RIGHT;
    }

    snake.headSize = snake.headSize + snake.speed;
    if (snake.headSize >= SEG_SIZE) snake.headSize = SEG_SIZE;

    snake.parts[0].y = snake.parts[0].y + snake.speed;
    snake.parts[0].height = SEG_SIZE - snake.headSize;
    snake.parts[snake.parts.length - 1].height = snake.parts[snake.parts.length - 1].height + snake.speed;

    if (snake.headSize == SEG_SIZE) {
        snake.parts.shift();
        var oldHead = snake.parts[snake.parts.length - 1];
        var head = { type: "rectangle", x: oldHead.x, y: oldHead.y + SEG_SIZE, width: SEG_SIZE, height: 0, color: BASE_COLOR };
        snake.parts.push(head);
        snake.headSize = 0;
    } 

    return snake;
}