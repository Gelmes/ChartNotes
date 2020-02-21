// Handles the reverting of state given a previous action state
class Revert{
    constructor(textArea){
        this.ta = textArea;
        // NOTE: Keep the fallowing list updated
        // The action list used in history pasted here for referance
        // this.actionsList = {
        //     "newRow":1,
        //     "downRow":2,
        //     "upRow":3,
        //     "increaseLevel":4,
        //     "decreaseLevel":5,
        //     "deleteRow":6,
        //     "backspaceRow":7,
        //     "nextStatus":8,
        //     "prevStatus":9,
        //     "moveRowDown":10,
        //     "moveRowUp":11,
        //     "mouseClick":12,
        //     "rowChange":13,
        // }
        
        this.antiActionsList = {
            "newRow"        :"deleteRow",
            "downRow"       :"upRow",
            "upRow"         :"downRow",
            "increaseLevel" :"decreaseLevel",
            "decreaseLevel" :"increaseLevel",
            "deleteRow"     :"newRow",
            "backspaceRow"  :"rowChange",
            "nextStatus"    :"prevStatus",
            "prevStatus"    :"nextStatus",
            "moveRowDown"   :"moveRowUp",
            "moveRowUp"     :"moveRowDown",
            "mouseClick"    :"mouseClick",
            "rowChange"     :"rowChange"
        }
    }

    revert(action){
        switch(action.id){
            case enumActionList.newRow          : this.deleteRow(action);  break;
            case enumActionList.downRow         : this.upRow(action); break;
            case enumActionList.upRow           : this.downRow(action);  break;
            case enumActionList.increaseLevel   : this.decreaseLevel(action); break;
            case enumActionList.decreaseLevel   : this.increaseLevel(action); break;
            case enumActionList.deleteRow       : this.newRow(action)   ; break;
            case enumActionList.backspaceRow    : break;
            case enumActionList.nextStatus      : break;
            case enumActionList.prevStatus      : break;
            case enumActionList.moveRowDown     : break;
            case enumActionList.moveRowUp       : break;
            case enumActionList.moveRowUp       : break;
            case enumActionList.mouseClick      : this.mouseClick(action); break;
            case enumActionList.rowChange       : this.rowChange(action); break;
            default: break;
        }
    }
    
    newRow(action){
        console.log("newRow");
        // Expecting action to be deleteRow
        this.ta.setTargetRow(action.tg - 1);
        this.ta.newRow();
        this.ta.setRowContent(action.c);
        this.ta.setCaretToEnd();
    }
    downRow(action){
        console.log("downRow");
        this.ta.setTargetRow(action.ptg);
        this.ta.setCaretToEnd();
    }
    upRow(action){
        console.log("upRow");
        this.ta.setTargetRow(action.ptg);
        this.ta.setCaretToEnd();
    }
    increaseLevel(action){
        console.log("increaseLevel", action.tg);
        this.ta.setTargetRow(action.tg);
        this.ta.increaseLevel();
    }
    decreaseLevel(action){
        console.log("decreaseLevel", action.tg);
        this.ta.setTargetRow(action.tg);
        this.ta.decreaseLevel();
    }
    deleteRow(action){
        console.log("deleteRow", action.tg);
        this.ta.setTargetRow(action.tg);
        this.ta.deleteRow();
    }
    // backspaceRow(position){ this.redoList = [];}
    // nextStatus(){           this.redoList = [];}
    // prevStatus(){           this.redoList = [];}
    // moveRowDown(){          this.redoList = [];}
    // moveRowUp(){            this.redoList = [];}
    mouseClick(action){
        console.log("mouseClick", action.tg);
        this.ta.setTargetRow(action.ptg);
        this.ta.setCaretToEnd();
    }
    rowChange(action){
        console.log("rowChange");
        this.ta.setTargetRow(action.tg);
        this.ta.setRowContent(action.pc);
    }

    
}