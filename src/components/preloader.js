export class Preloader extends Phaser.Scene {
    constructor() {
        super("Preloader");
    }

    preload() {
        this.load.image("gameField", "../assets/imgs/gameField.png");
    }

    create() {
        // let gameField = this.add.image(0, 0, 'gameField');
        // gameField.setOrigin(0,0);
        this.scene.start("Game");
    }
};
