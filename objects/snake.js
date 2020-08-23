
const SEG_SIZE = 10;
const BASE_COLOR = "#00ff00";
const NONE = "none";
const UP = "up";
const DOWN = "down"
const LEFT = "left";
const RIGHT = "right";

export function getSnake(canvas) {
    var snake = { type: "complex", isAlive: true, speed: 1.25, nextDir: NONE, size: 5, headSize: 0, parts: [] };
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

export function updateSnake(game) {

    var snake = game.snake;

    checkForCollisions(game);

    if (snake.isAlive) {
        checkForDirectionChange(game);
        incrementHeadSize(snake);
        addToHeadSegment(snake);
        subtractFromTailSegment(snake);

        if (snake.headSize == SEG_SIZE) timeForNewHead(game);
    }

    return snake;
}

function checkForDirectionChange(game) {

    var snake = game.snake;
    var head = getHead(snake);

    if (snake.nextDir == NONE) {
        if (game.events.upPressed) {
            if (head.dir == LEFT || head.dir == RIGHT) snake.nextDir = UP;
            game.events.upPressed = false;
        }
        if (game.events.downPressed) {
            if (head.dir == LEFT || head.dir == RIGHT) snake.nextDir = DOWN;
            game.events.downPressed = false;
        }
        if (game.events.leftPressed) {
            if (head.dir == UP || head.dir == DOWN) snake.nextDir = LEFT;
            game.events.leftPressed = false;
        }
        if (game.events.rightPressed) {
            if (head.dir == UP || head.dir == DOWN) snake.nextDir = RIGHT;
            game.events.rightPressed = false;
        }
    }
}

function incrementHeadSize(snake) {
    snake.headSize = snake.headSize + snake.speed;
    if (snake.headSize >= SEG_SIZE) {
        snake.headSize = SEG_SIZE;
    }
}

function addToHeadSegment(snake) {

    var head = getHead(snake);

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
}

function subtractFromTailSegment(snake) {

    var tail = getTail(snake);

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
}

function timeForNewHead(game) {
    
    var snake = game.snake;
    snake.headSize = 0;
    lopOffTail(snake);
    var nextDir = determineNextDir(snake);
    snake.nextDir = NONE;

    var head = getHead(snake);
    makeOldHeadFollowNewHead(head, nextDir);

    var newHead = { type: "rectangle", dir: nextDir, x: head.x, y: head.y, width: SEG_SIZE, height: SEG_SIZE, color: BASE_COLOR };
    orientNewHead(newHead, game.canvas);``
    snake.parts.push(newHead);
}

function lopOffTail(snake) {
    snake.parts.shift();
}

function determineNextDir(snake) {
    var head = getHead(snake);
    var nextDir = head.dir;
    if (snake.nextDir != NONE) nextDir = snake.nextDir;
    return nextDir;
}

function makeOldHeadFollowNewHead(head, nextDir) {
    head.dir = nextDir;
}

function orientNewHead(newHead, canvas) {

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
}

function getHead(snake) {
    return snake.parts[snake.parts.length - 1];
}

function getTail(snake) {
    return snake.parts[0];
}

function checkForCollisions(game) {

    var apples = game.apples.parts;
    var uneatenApples = [];
    var snake = game.snake;
    var segments = snake.parts;
    var head = getHead(game.snake);

    for (var i = 0; i < apples.length; i++) {
        var apple = apples[i];
        if (head.x != apple.x || head.y != apple.y) {
            uneatenApples.push(apple);
        } else {
            console.log("Consumed!");
        }
    }

    console.log(uneatenApples.length);
    game.apples.parts = uneatenApples;

    console.log(game.apples.parts.length);

}