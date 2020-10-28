import config from '../config';
import GameGen from './gameGen';
let { gameOptions }= config;

export class playGame extends Phaser.Scene{
    constructor(){
        super("Game");
        this.score = 0;
        this.scoreToWin = gameOptions.scoreToWin;
        this.scoreText = document.querySelector(".score");
        this.timerText = document.querySelector(".timer");
    
    }
    preload(){
        // const closeBtn = document.querySelector('.close-btn');
        // const win = document.querySelector('.you-win');

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
        this.canPick = true;
        this.input.on("pointerdown", this.tileSelect, this);
        // console.log(this.scoreToWin);
        this.timerToLose();
    }

    renderField(){
        this.poolArray = [];
        for(let i = 0; i < this.newGame.getRows(); i ++){
            for(let j = 0; j < this.newGame.getColumns(); j ++){
                let cubeX = gameOptions.boardOffset.x + gameOptions.tileSize * j + gameOptions.tileSize / 2;
                let cubeY = gameOptions.boardOffset.y + gameOptions.tileSize * i + gameOptions.tileSize / 2;
                let cube = this.add.sprite(cubeX, cubeY, "tiles", this.newGame.getValueAt(i, j));
                this.newGame.setCustomData(i, j, cube);
            }
        }
    }
    tileSelect(pointer){
        if(this.canPick){
            let row = Math.floor((pointer.y - gameOptions.boardOffset.y) / gameOptions.tileSize);
            let col = Math.floor((pointer.x - gameOptions.boardOffset.x) / gameOptions.tileSize);
            if(this.newGame.validPick(row, col)){
                if(this.newGame.countConnectedItems(row, col) > 1){
                    this.canPick = false;
                    let tileToRemove = this.newGame.listConnectedItems(row, col);
                    let destroyed = 0;
                    tileToRemove.forEach(function(tile){
                        destroyed ++;
                        this.poolArray.push(this.newGame.getCustomDataAt(tile.row, tile.column))
                        this.tweens.add({
                            targets: this.newGame.getCustomDataAt(tile.row, tile.column),
                            alpha: 0,
                            duration: gameOptions.destroySpeed,
                            callbackScope: this,
                            onComplete: function(){
                                destroyed --;
                                if(destroyed == 0){
                                    this.newGame.removeConnectedItems(row, col)
                                    this.makeTileFall();
                                }
                            }
                        });
                    }.bind(this))
                }
            }
        }
    }
    makeTileFall(){
        let fallingTiles = 0;
        let movements = this.newGame.arrangeBoard();
        let replenishMovements = this.newGame.refillBoard();
        this.changeScore(this.newGame.floodFillArray.length,);
        this.isWin();
        movements.forEach(function(movement){
            fallingTiles ++;
            this.tweens.add({
                targets: this.newGame.getCustomDataAt(movement.row, movement.column),
                y: this.newGame.getCustomDataAt(movement.row, movement.column).y + gameOptions.tileSize * movement.deltaRow,
                duration: gameOptions.fallSpeed * movement.deltaRow,
                callbackScope: this,
                onComplete: function(){
                    fallingTiles --;
                    if(fallingTiles == 0){
                        this.canPick = true
                    }
                }
            })
        }.bind(this))
        replenishMovements.forEach(function(movement){
            fallingTiles ++;
            let sprite = this.poolArray.pop();
            sprite.alpha = 1;
            sprite.y = gameOptions.boardOffset.y + gameOptions.tileSize * (movement.row - movement.deltaRow + 1) - gameOptions.tileSize / 2;
            sprite.x = gameOptions.boardOffset.x + gameOptions.tileSize * movement.column + gameOptions.tileSize / 2,
            sprite.setFrame(this.newGame.getValueAt(movement.row, movement.column));
            this.newGame.setCustomData(movement.row, movement.column, sprite);
            this.tweens.add({
                targets: sprite,
                y: gameOptions.boardOffset.y + gameOptions.tileSize * movement.row + gameOptions.tileSize / 2,
                duration: gameOptions.fallSpeed * movement.deltaRow,
                callbackScope: this,
                onComplete: function(){
                    fallingTiles --;
                    if(fallingTiles == 0){
                        this.canPick = true
                    }
                }
            });
        }.bind(this))
    }
    changeScore(cube) {
        if (cube < 3) {
            this.score += 5 * cube;
        } else if (cube >= 3 && cube < 5) {
            this.score += 10 * cube;
        } else if (cube >= 5) {
            this.score += 15 * cube;
        }
        this.scoreText.textContent = this.score;
    }
    isWin() {
        if(this.score >= this.scoreToWin){
            console.log("YouWin");
            this.input.off("pointerdown", this.tileSelect, this);
            document.querySelector('.you-win').classList.remove('hide','vanishOut');
            document.querySelector('.you-win').classList.add('magictime', 'swashIn');
            document.querySelector('.close-btn').addEventListener('click', function(){
                document.querySelector('.you-win').classList.remove('swashIn');
                document.querySelector('.you-win').classList.add('vanishOut');
                    setTimeout(function(){
                        document.querySelector('.you-win').classList.add('hide');
                    }, 1000);
                }
            )
        }
    }
    timerToLose() {
        

    }
}