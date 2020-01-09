class Undo{
    constructor(){
        this.historyList = [];

        // NOTE: This action list contains the ID(index) of a given action
        // additional actions can be added to the end of this list
        this.actionsList = {
            "newRow":1,
            "downRow":2,
            "upRow":3,
            "increaseLevel":4,
            "decreaseLevel":5,
            "deleteRow":6,
            "nextStatus":7,
            "moveRowDown":8,
            "moveRowUp":9

        }
    }

    newRow(){
    }

    downRow(){
    }

    upRow(){
    }

    increaseLevel(){
    }

    decreaseLevel(){
    }

    deleteRow(){
    }

    deleteRowIfCursorAtStart(){
    }

    nextStatus(){
    }

    moveRowDown(){
    }

    moveRowUp(){
    }
}