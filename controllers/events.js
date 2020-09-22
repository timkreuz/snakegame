export function keyDown(game, e) {

    if (e.keyCode == 37 || e.keyCode == 100) {
        game.events.leftPressed = true;
    }
    else if (e.keyCode == 38 || e.keyCode == 104) {
        game.events.upPressed = true;
    }
    else if (e.keyCode == 39 || e.keyCode == 102) {
        game.events.rightPressed = true;
    }
    else if (e.keyCode == 40 || e.keyCode == 98) {
        game.events.downPressed = true;
    }
}

export function keyUp(game, e) {
    
}