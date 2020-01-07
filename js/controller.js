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

    newRow(){
        for (model of models){
            model.newRow();
        }
    }

    downRow(){
        for (model of models){
            model.downRow();
        }
    }

    upRow(){
        for (model of models){
            model.upRow();
        }
    }

    incLevel(){
        for (model of models){
            model.incLevel();
        }
    }

    decLevel(){
        for (model of models){
            model.decLevel();
        }
    }

    delRow(){
        for (model of models){
            model.delRow();
        }
    }

    bacRow(){
        for (model of models){
            model.bacRow();
        }
    }

    tagIter(){
        for (model of models){
            model.tagIter();
        }
    }

    moveRowDown(){
        for (model of models){
            model.moveRowDown();
        }
    }

    moveRowUp(){
        for (model of models){
            model.moveRowUp();
        }
    }
}