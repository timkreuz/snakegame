export function keyDown(game, e) {

    if (e.keyCode == 37) {
        game.events.leftPressed = true;
    }
    else if (e.keyCode == 38) {
        game.events.upPressed = true;
    }
    else if (e.keyCode == 39) {
        game.events.rightPressed = true;
    }
    else if (e.keyCode == 40) {
        game.events.downPressed = true;
    }
}

export function keyUp(game, e) {
    
}