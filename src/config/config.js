export default {
    gameOptions : {
        tileSize: 170.4,
        boardOffset: {
            x: 50,
            y: 50
        },
        destroySpeed: 200,
        fallSpeed: 100,
        scoreToWin: 1000,
    },
    gameConfig : {
        type: Phaser.AUTO,
        parent: "game",
        width: 1633,
        height: 1819,
        backgroundColor: 0xa1a1a6,
    }
};
