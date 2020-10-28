export default class GameGen {
    constructor(obj) {
        this.rows = obj.rows;
        this.columns = obj.columns;
        this.items = obj.items;
    }

    // Создание игровой доски
    createBoard() {
        this.newGameArray = [];
        for (let i = 0; i < this.rows; i++) {
            this.newGameArray[i] = [];
            for (let j = 0; j < this.columns; j++) {
                let randomValue = Math.floor(Math.random() * this.items);
                this.newGameArray[i][j] = {
                    value: randomValue,
                    isEmpty: false,
                    row: i,
                    column: j
                }
            }
        }
    }

    // Вернуть строки доски
    getRows() {
        return this.rows;
    }

    // Вернуть колонки доски
    getColumns() {
        return this.columns;
    }
    // Вернуть значение кубика если совпало, иначе это не верный кубик
    getValueAt(row, column){
        if(!this.validPick(row, column)){
            return false;
        }
        return this.gameArray[row][column].value;
    }

     // Проверка на совпадение значения кубиков
     validPick(row, column) {
        return row >= 0 && row < this.rows && column >= 0 && column < this.columns && this.newGameArray[row] !== undefined && this.newGameArray[row][column] !== undefined;
    }
    // Задать произвольное значение выбранному элементу
    setCustomData(row, column, customData){
        this.gameArray[row][column].customData = customData;
    }
}