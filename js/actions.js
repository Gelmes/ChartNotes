// Action handler
// Actions that do not involve the keyboard are kept here

class ActionHandler{
    constructor(textArea, history){
        this.ta = textArea;
        this.hist = history;
        // this.ta.content.click(() => { this.focusChange(); });
        this.ta.content.click(() => { this.mouseDown(); });
        // this.ta.content.mousedown(() => { this.mouseDown(); });
        // this.ta.content.mouseup  (() => { this.mouseUp();   });
    }

    focusChange(){
        console.log(this.ta.getTargetRow());
        
        console.log(this.ta.getPrevTargetRow());
    }

    mouseDown(){
        this.hist.mouseClick();
    }

    mouseUp(){
        this.hist.mouseClick();
    }
}