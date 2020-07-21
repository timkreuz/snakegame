import {updateSnake} from '../objects/snake.js'; 

export function updateGame(game) {
    game.snake = updateSnake(game);
}