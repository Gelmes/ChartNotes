const Mousetrap = require("mousetrap");

// Helper functions
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }
  
  function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
  }

class Shortcuts{
    constructor(texbox) {
        this.keyPressed = 0; // Used to indicate when there are file changes
        this.texbox = texbox;
        //this.texbox.content.keydown((event) =>this.handleKeyDown(event));
        this.shortcuts = {
            'newRow' : 'enter',
            'downRow' : 'down',
            'upRow' : 'up',
            'incLevel' : 'tab',
            'decLevel' : 'shift+tab',
            'delRow' : 'del',
            'bacRow' : 'backspace',
            'fileNew' : 'ctrl+n',
            'fileSave' : 'ctrl+s',
            'fileOpen' : 'ctrl+o',
            'tagIter' : 'ctrl+t'
        }
        this.setKey_newRow(this.shortcuts['newRow']);
        this.setKey_downRow(this.shortcuts['downRow']);
        this.setKey_upRow(this.shortcuts['upRow']);
        this.setKey_incLevel(this.shortcuts['incLevel']);
        this.setKey_decLevel(this.shortcuts['decLevel']);
        this.setKey_delRow(this.shortcuts['delRow']);
        this.setKey_bacRow(this.shortcuts['bacRow']);
        this.setKey_fileNew(this.shortcuts['fileNew']);
        this.setKey_fileSave(this.shortcuts['fileSave']);
        this.setKey_fileOpen(this.shortcuts['fileOpen']);
        this.setKey_tagIter(this.shortcuts['tagIter']);
    }
    
    // // Depricated code Likely won't use again 
    // handleKeyDown(event){
    //     console.log("Key: " + event.key);
    //     switch(event.key){
    //         case "Enter"    : event.preventDefault(); this.handleEnter(); break;
    //         case "ArrowDown": event.preventDefault(); this.handleDown (); break;
    //         case "ArrowUp"  : event.preventDefault(); this.handleUp   (); break;
    //         default: console.log("Unhandled Key");
    //     }
    // }
    // handleEnter(){
    //     this.texbox.appendRow();
    // }
    
    // handleDown(){
    //     this.texbox.goDown();
    // }
    
    // handleUp(){
    //     this.texbox.goUp();
    // }

    // handleTab(){
    //     this.texbox.increaseLevel();
    // }

    setKey_newRow(key){
        Mousetrap.unbind(this.shortcuts['newRow']);
        this.shortcuts['newRow'] = key;
        Mousetrap.bind(key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.appendRow();
        });
    }
    setKey_downRow(key){
        Mousetrap.unbind(this.shortcuts['downRow']);
        this.shortcuts['downRow'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            ta.goDown();
        });
    }
    setKey_upRow(key){
        Mousetrap.unbind(this.shortcuts['upRow']);
        this.shortcuts['upRow'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            ta.goUp();
        });
    }
    setKey_incLevel(key){
        Mousetrap.unbind(this.shortcuts['incLevel']);
        this.shortcuts['incLevel'] = key;
        Mousetrap.bind(key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.increaseLevel();
        });
    }
    setKey_decLevel(key){
        Mousetrap.unbind(this.shortcuts['decLevel']);
        this.shortcuts['decLevel'] = key;
        Mousetrap.bind(key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.decreaseLevel();
        });
    }
    setKey_delRow(key){

        Mousetrap.unbind(this.shortcuts['delRow']);
        this.shortcuts['delRow'] = key;
        Mousetrap.bind(key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.deleteRow();
        });

    }
    setKey_bacRow(key){
        Mousetrap.unbind(this.shortcuts['bacRow']);
        this.shortcuts['bacRow'] = key;
        Mousetrap.bind(key, function(e) {
            sh.keyPressed = 1;
            var position = window.getSelection().getRangeAt(0).startOffset;
            if(position == 0){
                event.preventDefault();
                var target = ta.getTargetRow();
                if(ta.rows[target].level){
                    ta.decreaseLevel();
                } else {
                    ta.deleteRow();
                    if(target < ta.rows.length){
                        ta.goUp();
                    }
                }   
            }
        });

    }
    
    setKey_fileNew(key){
        Mousetrap.unbind(this.shortcuts['fileNew']);
        this.shortcuts['fileNew'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            menuNew();
        });
    }
    
    setKey_fileSave(key){
        Mousetrap.unbind(this.shortcuts['fileSave']);
        this.shortcuts['fileSave'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            menuSave();
        });
    }
    
    setKey_fileOpen(key){
        Mousetrap.unbind(this.shortcuts['fileOpen']);
        this.shortcuts['fileOpen'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            menuOpen();
        });
    }
    
    setKey_tagIter(key){
        Mousetrap.unbind(this.shortcuts['tagIter']);
        this.shortcuts['tagIter'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            // get current row tag
            ta.setNextStatus(); // Sets the current rows tag to the next tag
        });
    }

  }
  
  module.exports = Shortcuts;