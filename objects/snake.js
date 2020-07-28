
const SEG_SIZE = 8;
const BASE_COLOR = "#00ff00";
const STRIPE_COLOR = "#ffff00";
const NONE = "none";
const UP = "up";
const DOWN = "down"
const LEFT = "left";
const RIGHT = "right";

export function getSnake(canvas) {
    var snake = { type: "complex", speed: 2.0, nextDir: NONE, nextDir2: NONE, headSize: 0, parts: [] };
    snake.parts = getSegments(snake.speedx, snake.speedy);
    return snake;
}

function getSegments(canvas) {
    var xStart = 160;
    var yStart = 0;
    var tail = { type: "rectangle", dir: DOWN, x: xStart, y: yStart + SEG_SIZE * 4, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s2 = { type: "rectangle", dir: DOWN, x: xStart, y: yStart + SEG_SIZE * 5, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s3 = { type: "rectangle", dir: DOWN, x: xStart, y: yStart + SEG_SIZE * 6, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var s4 = { type: "rectangle", dir: DOWN, x: xStart, y: yStart + SEG_SIZE * 7, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    var head = { type: "rectangle", dir: DOWN, x: xStart, y: yStart + SEG_SIZE * 8, width: SEG_SIZE, height: 0, color: BASE_COLOR };
    return [tail, s2, s3, s4, head];
}

//The snake only moves down.  No changing directions yet.
//It does not respond to events. But the events are loaded and ready to use.
export function updateSnake(game) {

    var canvas = game.canvas;
    var snake = game.snake;
    var head = snake.parts[snake.parts.length - 1];
    var tail = snake.parts[0];

    //register the next Direction.  We won't actually change directions until the current head gets to 100%
    if (snake.nextDir == NONE || snake.nextDir2 == NONE) {
        if (game.events.upPressed && (head.dir == LEFT || head.dir == RIGHT)) {
            if (snake.nextDir == NONE) snake.nextDir = UP;
            else snake.nextDir2 = UP;
            game.events.upPressed = false;
        }
        if (game.events.downPressed && (head.dir == LEFT || head.dir == RIGHT)) {
            if (snake.nextDir == NONE) snake.nextDir = DOWN;
            else snake.nextDir2 = DOWN;
            game.events.downPressed = false;
        }
        if (game.events.leftPressed && (head.dir == UP || head.dir == DOWN)) {
            if (snake.nextDir == NONE) snake.nextDir = LEFT;
            else snake.nextDir2 = LEFT;
            game.events.leftPressed = false;
        }
        if (game.events.rightPressed && (head.dir == UP || head.dir == DOWN)) {
            if (snake.nextDir == NONE) snake.nextDir = RIGHT;
            else snake.nextDir2 = RIGHT;
            game.events.rightPressed = false;
        }
    }

    //make sure the head is not bigger than the segment size
    snake.headSize = snake.headSize + snake.speed;
    if (snake.headSize >= SEG_SIZE) {
        snake.headSize = SEG_SIZE;
    }

    if (head.dir == UP) {
        head.y = head.y - snake.speed;
        head.height = head.height + snake.speed;
    }
    if (head.dir == DOWN) {
        head.height = head.height + snake.speed;
    }
    if (head.dir == LEFT) {
        head.x = head.x - snake.speed;
        head.width = head.width + snake.speed;
    }
    if (head.dir == RIGHT) {
        head.width = head.width + snake.speed;
    }

    if (tail.dir == UP) {
        tail.height = SEG_SIZE - snake.headSize;
    }
    if (tail.dir == DOWN) {
        tail.y = tail.y + snake.speed;
        tail.height = SEG_SIZE - snake.headSize;
    }
    if (tail.dir == LEFT) {
        tail.width = SEG_SIZE - snake.headSize;
    }
    if (tail.dir == RIGHT) {
        tail.x = tail.x + snake.speed;
        tail.width = SEG_SIZE - snake.headSize;
    }

    if (snake.headSize == SEG_SIZE) {
        snake.parts.shift();
        snake.headSize = 0;

        var newDir = head.dir;
        if (snake.nextDir != NONE) {
            newDir = snake.nextDir;
            snake.nextDir = snake.nextDir2;
            snake.nextDir2 = NONE;
        }
        head.dir = newDir;

        var newHead = { type: "rectangle", dir: newDir, x: head.x, y: head.y, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };

        if (newHead.dir == UP) {
            newHead.height = 0;
            if (newHead.y == 0) newHead.y = canvas.height; 
            else newHead.y = newHead.y;
        }
        
        if (newHead.dir == DOWN) {
            newHead.height = 0;
            if (newHead.y == canvas.height - SEG_SIZE) newHead.y = 0; 
            else newHead.y = newHead.y + SEG_SIZE;
        }
        
        if (newHead.dir == LEFT) {
            newHead.width = 0;
            if (newHead.x == 0) newHead.x = canvas.width; 
            else newHead.x = newHead.x;
        }
        
        if (newHead.dir == RIGHT) {
            newHead.width = 0;
            if (newHead.x == canvas.width - SEG_SIZE) newHead.x = 0; 
            else newHead.x = newHead.x + SEG_SIZE;
        }
            
        snake.parts.push(newHead);
    }

    return snake;
}
