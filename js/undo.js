class Undo{
    constructor(textArea, history, revert){
        this.history = history;
        this.ta = textArea;
        this.revert = revert;
        this.redoList = [];
    }

    undo(){
        let action = this.history.pop();
        console.log(action);
        if(action){
            this.revert.revert(action);
            this.redoList.push(action);
        }
    }

    redo(){
        let action = this.redoList.pop();
        if(action){
            
        }
    }

    
    // Any action taken after an undo clears the redoList and changes history
    newRow(){               this.redoList = [];}
    downRow(){              this.redoList = [];}
    upRow(){                this.redoList = [];}
    increaseLevel(){        this.redoList = [];}
    decreaseLevel(){        this.redoList = [];}
    deleteRow(){            this.redoList = [];}
    backspaceRow(position){ this.redoList = [];}
    nextStatus(){           this.redoList = [];}
    prevStatus(){           this.redoList = [];}
    moveRowDown(){          this.redoList = [];}
    moveRowUp(){            this.redoList = [];}
    // mouseClick(){           this.redoList = [];}
    // rowChange(){            this.redoList = [];}
}