import 'phaser';
import './style/style.css';
import './style/magic.css';
import config from './config';
import {playGame} from './components/playGame';
import { Preloader } from './components/preloader';


document.querySelector(".play-pause").addEventListener("click", function() {
    this.classList.toggle("paused");
  });
  let { gameConfig } = config;
 console.log(gameConfig);


// let game;
//  window.onload = function() {
//     let { gameConfig } = config;
//     game = new Phaser.Game(gameConfig);
//     game.scene.add("Preloader", Preloader);
//     game.scene.add("Game", playGame);
//     game.scene.start("Preloader");
//     window.focus()
//     console.log(game);
//     // resize();
//     // window.addEventListener("resize", resize);
// };
class Game extends Phaser.Game {
    constructor() {
        super(gameConfig);
        this.scene.add("Preloader", Preloader);
        this.scene.add("Game", playGame);
        this.scene.start("Preloader");
    }
}

window.onload = function() {
    window.game = new Game();
    window.focus();
    console.log(game);
   
};

// function resize() {
//     let canvas = document.querySelector("canvas");
//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;
//     let windowRatio = windowWidth / windowHeight;
//     let gameRatio = game.config.width / game.config.height;
//     if(windowRatio < gameRatio){
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else{
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }