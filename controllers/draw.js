export function drawGame(game) {
    displayScore(game);
    drawObjects(game);
}

function displayScore(game) {
    // game.infoCtx.clearRect(0, 0, game.infoCenter.width, game.infoCenter.height);
    // game.infoCtx.fillStyle = "#ffffff";
    // game.infoCtx.fillText("Score: " + game.stats.score + "          Abductions: " + game.stats.abductions +
    //     "          Aliens Landed: " + game.stats.visitors, 8, 20);
}

function drawObjects(game) {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    drawObject(game.ctx, game.snake);
    drawObject(game.ctx, game.apples);
}

function drawObject(ctx, object) {
    if (object.type == "rectangle") {
        drawRectangle(ctx, object);
    }
    if (object.type == "circle") {
        drawCircle(ctx, object);
    }
    if (object.type == "image") {
        drawImage(ctx, object);
    }
    if (object.type == "complex") {
        drawComplex(ctx, object.parts)
    }
}

function drawRectangle(ctx, object) {
    ctx.beginPath();
    ctx.rect(object.x, object.y, object.width, object.height);
    ctx.fillStyle = object.color;
    ctx.fill();
    ctx.closePath();
}

function drawCircle(ctx, object) {
    ctx.beginPath();
    ctx.arc(object.x + object.width/2, object.y + object.height/2,  object.height/2, 0, 2 * Math.PI);
    ctx.fillStyle = object.color;
    ctx.fill();
    ctx.closePath();
}

function drawImage(ctx, object) {
    ctx.beginPath();
    ctx.drawImage(object.img, object.y, object.width, object.height);
    ctx.fillStyle = object.color;
    ctx.fill();
    ctx.closePath();
}

function drawComplex(ctx, parts) {
    for (var i = 0; i < parts.length; i++) {
        drawObject(ctx, parts[i]);
    }
}