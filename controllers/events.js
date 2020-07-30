export function keyDown(game, e) {

    if (e.keyCode == 37 || e.keyCode == 100) {
        console.log("left pressed")
        game.events.leftPressed = true;
    }
    else if (e.keyCode == 38 || e.keyCode == 104) {
        console.log("up pressed")
        game.events.upPressed = true;
    }
    else if (e.keyCode == 39 || e.keyCode == 102) {
        console.log("right pressed")
        game.events.rightPressed = true;
    }
    else if (e.keyCode == 40 || e.keyCode == 98) {
        console.log("down pressed")
        game.events.downPressed = true;
    }
}

export function keyUp(game, e) {
    
}