// Objects that keep track of action history
// Globals:
// - enumActionList
// Classes:
// - HistoricAction
// - History
// - PreHistory


// NOTE: This action list contains the ID(index) of a given action
// additional actions can be added to the end of this list
// This is mainly meant to be a minor optimization
let enumActionList = {
    "newRow":1,
    "downRow":2,
    "upRow":3,
    "increaseLevel":4,
    "decreaseLevel":5,
    "deleteRow":6,
    "backspaceRow":7,
    "nextStatus":8,
    "prevStatus":9,
    "moveRowDown":10,
    "moveRowUp":11,
    "mouseClick":12,
    "rowChange":13,
}


class HistoricAction{
    constructor(actionId){
        this.date = Date.now(); // in milliseconds since jan 1, 1970
        this.id     = actionId; // The ID for the action
        this.tg     = 0;        // Target
        this.ptg    = 0;        // Previous Target
        this.c      = "";       // Content
        this.pc     = "";       // Previous Content
        this.v1     = 0;        // Value 1
        this.v2     = 0;        // Value 2
        this.args   = [];       // TODO: DELETE: DEPRICATED:
    }
}


// This history class is meant to keep track of relevant data
// from action taken, a copy of the textArea
class History{
    constructor(textArea){
        this.ta = textArea; // TextArea Model to pull relevant historic data
        this.historyList = [];

        // NOTE: This action list contains the ID(index) of a given action
        // additional actions can be added to the end of this list
        // This is mainly meant to be a minor optimization
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

        this.rowContents = ""; // Used to determine if the focused in rows contents have changed
    }

    pop(){
        return this.historyList.pop();
    }
    push(action){
        // Must push of type HistoricAction
        this.historyList.push(action);

    }

    newRow(){
        let action = new HistoricAction(enumActionList['newRow']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    downRow(){
        let action = new HistoricAction(enumActionList['downRow']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    upRow(){
        let action = new HistoricAction(enumActionList['upRow']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    increaseLevel(){
        let action = new HistoricAction(enumActionList['increaseLevel']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.v1 = this.ta.getLevel();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    decreaseLevel(){
        let action = new HistoricAction(enumActionList['decreaseLevel']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.v1 = this.ta.getLevel();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    deleteRow(){
        // let action = new HistoricAction(enumActionList['deleteRow']);
        // action.args = [
        //     this.ta.getTargetRow(),
        //     this.ta.getPrevTargetRow()
        // ];
        // this.rowChange(); // Check for row text changes
        // this.historyList.push(action);
    }

    backspaceRow(){
        let action = new HistoricAction(enumActionList['backspaceRow']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.v1 = this.ta.getLevel();
        this.historyList.push(action);
    }

    nextStatus(){
        let action = new HistoricAction(enumActionList['nextStatus']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.v1 = this.ta.getStatus();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    prevStatus(){
        let action = new HistoricAction(enumActionList['prevStatus']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.v1 = this.ta.getStatus();
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    moveRowDown(){
        let action = new HistoricAction(enumActionList['moveRowDown']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.c = this.ta.getRowContent();
        action.pc = this.ta.getRowContent(action.ptg);
        
        // this.rowChange(); // We will not check row change here since we are expecting it
        this.historyList.push(action);
    }

    moveRowUp(){
        let action = new HistoricAction(enumActionList['moveRowUp']);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.c = this.ta.getRowContent();
        action.pc = this.ta.getRowContent(action.ptg);

        // this.rowChange(); // We will not check row change here since we are expecting it
        this.historyList.push(action);
    }

    mouseClick(){
        let action = new HistoricAction(enumActionList['mouseClick']);
        let select = window.getSelection().getRangeAt(0);
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.v1 = select.startOffset;
        action.v2 = select.endOffset;
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }
    
    // BUG: CLicking through rows registers as a change fix this
    // BUG: Moving Rows
    rowChange(){
        let prevRow = this.ta.getPrevTargetRow();
        let currRow = this.ta.getTargetRow();
        let latestRowContents = this.ta.rows[prevRow].content.text();
        console.log("Prev" + prevRow + ": " + latestRowContents); //DELETE:
        console.log("Curr" + currRow + ":   " + this.rowContents); //DELETE:
        // console.log(this.ta.rows[0].content.text())
        if(this.rowContents != latestRowContents){
            // console.log("OG: " + this.latestRowContents);
            // console.log("AF: " + this.rowContents);
            console.log("Change on row " + prevRow);
            let action = new HistoricAction(enumActionList['rowChange']);
            // let select = window.getSelection().getRangeAt(0);
            // let prevRow = this.ta.getPrevTargetRow();
      
            action.tg = this.ta.getTargetRow();
            action.ptg = this.ta.getPrevTargetRow();
            action.c = latestRowContents;
            action.pc = this.rowContents;
            
            this.historyList.push(action);
        } else {
            // console.log("No change");
        }
        this.rowContents = this.ta.rows[currRow].content.text();
    }
}

// Used to track actions before they take place
class PreHistory{
    constructor(textArea, history){
        this.ta = textArea; // TextArea Model to pull relevant historic data
        this.history = history // main history object
        this.historyList = history.historyList; // Maps the history object to the prehistory
        this.rowContents = ""; // Used to determine if the focused in rows contents have changed
    }

    pop(){
        return this.historyList.pop();
    }
    push(action){
        // Must push of type HistoricAction
        this.historyList.push(action);

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
        let action = new HistoricAction(enumActionList['deleteRow']); 
        action.tg = this.ta.getTargetRow();
        action.ptg = this.ta.getPrevTargetRow();
        action.c = this.ta.getRowContent();
        this.historyList.push(action);
    }

    backspaceRow(){
    }

    nextStatus(){
    }

    prevStatus(){
    }

    moveRowDown(){
    }

    moveRowUp(){
    }

    mouseClick(){
    }
    
    // BUG: CLicking through rows registers as a change fix this
    // BUG: Moving Rows
    rowChange(){
        let prevRow = this.ta.getPrevTargetRow();
        let currRow = this.ta.getTargetRow();
        let latestRowContents = this.ta.rows[prevRow].content.text();
        console.log("Prev" + prevRow + ": " + latestRowContents); //DELETE:
        console.log("Curr" + currRow + ":   " + this.rowContents); //DELETE:
        // console.log(this.ta.rows[0].content.text())
        if(this.rowContents != latestRowContents){
            // console.log("OG: " + this.latestRowContents);
            // console.log("AF: " + this.rowContents);
            console.log("Change on row " + prevRow);
            let action = new HistoricAction(enumActionList['rowChange']);
            // let select = window.getSelection().getRangeAt(0);
            // let prevRow = this.ta.getPrevTargetRow();
      
            action.tg = this.ta.getTargetRow();
            action.ptg = this.ta.getPrevTargetRow();
            action.c = latestRowContents;
            action.pc = this.rowContents;

            this.historyList.push(action);
        } else {
            // console.log("No change");
        }
        this.rowContents = this.ta.rows[currRow].content.text();
    }
}


