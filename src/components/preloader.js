export class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('gameField', '../assets/imgs/gameField.png');
  }

  create() {
    this.scene.start('Game');
  }
}
