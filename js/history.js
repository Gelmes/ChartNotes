class HistoricAction{
    constructor(actionId){
        this.date = Date.now(); // in milliseconds since jan 1, 1970
        this.action = actionId;
        this.args = [];
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
        this.actionsList = {
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
        this.rowContents = ""; // Used to determine if the focused in rows contents have changed
    }

    newRow(){
        let action = new HistoricAction(this.actionsList['newRow']);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow()
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    downRow(){
        let action = new HistoricAction(this.actionsList['downRow']);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow()
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    upRow(){
        let action = new HistoricAction(this.actionsList['upRow']);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow()
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    increaseLevel(){
        let action = new HistoricAction(this.actionsList['increaseLevel']);
        let target = this.ta.getTargetRow();
        action.args = [
            target,
            this.ta.getPrevTargetRow(),
            this.ta.rows[target].level
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    decreaseLevel(){
        let action = new HistoricAction(this.actionsList['decreaseLevel']);
        let target = this.ta.getTargetRow();
        action.args = [
            target,
            this.ta.getPrevTargetRow(),
            this.ta.rows[target].level
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    deleteRow(){
        let action = new HistoricAction(this.actionsList['deleteRow']);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow()
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    backspaceRow(){
        let action = new HistoricAction(this.actionsList['backspaceRow']);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow(),
        ];
        this.historyList.push(action);
    }

    nextStatus(){
        let action = new HistoricAction(this.actionsList['nextStatus']);
        let target = this.ta.getTargetRow();
        action.args = [
            target,
            this.ta.getPrevTargetRow(),
            this.ta.rows[target].getStatus()
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    prevStatus(){
        let action = new HistoricAction(this.actionsList['prevStatus']);
        let target = this.ta.getTargetRow();
        action.args = [
            target,
            this.ta.getPrevTargetRow(),
            this.ta.rows[target].getStatus()
        ];
        this.rowChange(); // Check for row text changes
        this.historyList.push(action);
    }

    moveRowDown(){
        let action = new HistoricAction(this.actionsList['moveRowDown']);
        console.log("Targets", this.ta.getTargetRow(), this.ta.getPrevTargetRow() );
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow(),
            this.ta.rows[this.ta.getTargetRow()].content.text(),
            this.ta.rows[this.ta.getPrevTargetRow()].content.text()
        ];
        // this.rowChange(); // We will not check row change here since we are expecting it
        this.historyList.push(action);
    }

    moveRowUp(){
        let action = new HistoricAction(this.actionsList['moveRowUp']);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow(),
            this.ta.rows[this.ta.getTargetRow()].content.text(),
            this.ta.rows[this.ta.getPrevTargetRow()].content.text()
        ];
        // this.rowChange(); // We will not check row change here since we are expecting it
        this.historyList.push(action);
    }

    mouseClick(){
        let action = new HistoricAction(this.actionsList['mouseClick']);
        let select = window.getSelection().getRangeAt(0);
        action.args = [
            this.ta.getTargetRow(),
            this.ta.getPrevTargetRow(),
            select.startOffset,
            select.endOffset
        ];
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
        } else {
            // console.log("No change");
        }
        this.rowContents = this.ta.rows[currRow].content.text();
        // let action = new HistoricAction(this.actionsList['rowChange']);
        // let select = window.getSelection().getRangeAt(0);
        // let prevRow = this.ta.getPrevTargetRow();
        // action.args = [
        //     this.ta.getTargetRow(),
        //     prevRow,
        //     this.ta.rows[prevRow].content.text()
        // ];
        // this.historyList.push(action);
    }
}