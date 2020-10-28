import config from '../config';
import GameGen from './gameGen';
let { gameOptions }= config;

export class playGame extends Phaser.Scene{
    constructor(){
        super("Game");
    }
    preload(){
        console.log(gameOptions);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.items = this.add.group([
            {
                key: "gameField",
                setXY: {
                    x: width /2 - 5,
                    y: height /2
                },
                setScale: {
                    x: 2.75,
                    y: 2.75
                }
            },
        ]);

        this.load.spritesheet("tiles", "../assets/imgs/tiles.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
    }
    
    create(){
        this.newGame = new GameGen({
            rows: 10,
            columns: 9,
            items: 5
        });
        this.newGame.createBoard();
        this.renderField();
        // this.canPick = true;
        // this.input.on("pointerdown", this.tileSelect, this);
    }

    renderField(){
        this.poolArray = [];
        for(let i = 0; i < this.newGame.getRows(); i ++){
            for(let j = 0; j < this.newGame.getColumns(); j ++){
                let cubeX = gameOptions.boardOffset.x + gameOptions.tileSize * j + gameOptions.tileSize / 2;
                let cubeY = gameOptions.boardOffset.y + gameOptions.tileSize * i + gameOptions.tileSize / 2
                // let cube = this.add.sprite(cubeX, cubeY, "tiles", this.newGame.getValueAt(i, j));
                // this.newGame.setCustomData(i, j, cube);
                let cube = this.add.sprite(cubeX, cubeY, "tiles");

            }
        }
    }
}