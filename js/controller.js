// Controller
// The controller updates all the models according to the actions activated
// This function will allow a single function call to update the TextArea
// and the Undo history along with any other models that might need to be 
// updated in the future like charts and flow diagrams
// The views will be updated with a simple call to update view
// Its expected that the views will have an instance of the models to
// automatically update themselves with the models contents


// newRow           // implemented
// downRow          // implemented
// upRow            // implemented
// incLevel         // implemented
// decLevel         // implemented
// delRow           // implemented
// bacRow           // implemented
// fileNew          // not implemented not an action on the model
// fileSave         // not implemented not an action on the model
// fileOpen         // not implemented not an action on the model
// tagIter          // implemented
// downRowShrt      // copy of downRow
// upRowShrt        // copy of upRow
// zoomIn           // not implemented not an action on the model
// zoomOut          // not implemented not an action on the model
// moveRowDown      // implemented
// moveRowUp        // implemented
// showHistory      // not implemented not an action on the model
// toogleDeveloper  // not implemented not an action on the model

class Controller{
    constructor(){
        this.models = [];
    }
    
    addModel(model){
        this.models.push(model);
    }

    newRow(){
        for (let model of this.models){
            model.newRow();
        }
    }

    downRow(){
        for (let model of this.models){
            model.downRow();
        }
    }

    upRow(){
        for (let model of this.models){
            model.upRow();
        }
    }

    increaseLevel(){
        for (let model of this.models){
            model.increaseLevel();
        }
    }

    decreaseLevel(){
        for (let model of this.models){
            model.decreaseLevel();
        }
    }

    deleteRow(){
        for (let model of this.models){
            model.deleteRow();
        }
    }

    backspaceRow(position){
        for (let model of this.models){
            model.backspaceRow(position);
        }
    }

    nextStatus(){
        for (let model of this.models){
            model.nextStatus();
        }
    }

    prevStatus(){
        for (let model of this.models){
            model.prevStatus();
        }
    }

    moveRowDown(){
        for (let model of this.models){
            model.moveRowDown();
        }
    }

    moveRowUp(){
        for (let model of this.models){
            model.moveRowUp();
        }
    }
}