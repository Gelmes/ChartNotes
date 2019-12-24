console.log("Importing: ", "shortcuts.js");

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
            'tagIter' : 'ctrl+t',
            'downRowShrt' : 'ctrl+j',
            'upRowShrt' : 'ctrl+k',
            'zoomIn' : 'ctrl+-',
            'zoomOut' : 'ctrl+=',
            'moveRowDown' : 'alt+down',
            'moveRowUp' : 'alt+up',
            'showHistory' : 'ctrl+h',
            'toogleDeveloper' : 'ctrl+d'
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
        this.setKey_downRowShrt(this.shortcuts['downRowShrt']);
        this.setKey_upRowShrt(this.shortcuts['upRowShrt']);
        this.setKey_zoomIn(this.shortcuts['zoomIn']);
        this.setKey_zoomOut(this.shortcuts['zoomOut']);
        this.setKey_moveRowDown(this.shortcuts['moveRowDown']);
        this.setKey_moveRowUp(this.shortcuts['moveRowUp']);
        this.setKey_showHistory(this.shortcuts['showHistory']);
        this.setKey_toogleDeveloper(this.shortcuts['toogleDeveloper']);
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
    configureKey(command, key, callback){
        Mousetrap.unbind(this.shortcuts[command]);
        this.shortcuts[command] = key;
        Mousetrap.bind(key, function(e) {
            hist.record(key);
            callback();
        });
    }

    setKey_newRow(key){
        this.configureKey('newRow', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.appendRow();
        });
    }
    setKey_downRow(key){            
        this.configureKey('downRow', key, function(e) {
            event.preventDefault();
            ta.goDown();
        });
    }
    setKey_upRow(key){
        this.configureKey('upRow', key, function(e) {
            event.preventDefault();
            ta.goUp();
        });
    }
    setKey_incLevel(key){
        this.configureKey('incLevel', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.increaseLevel();
        });
    }
    setKey_decLevel(key){
        this.configureKey('decLevel', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.decreaseLevel();
        });
    }
    setKey_delRow(key){
        this.configureKey('delRow', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.deleteRow();
        });

    }
    setKey_bacRow(key){
        this.configureKey('bacRow', key, function(e) {
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
        this.configureKey('fileNew', key, function(e) {
            event.preventDefault();
            menuNew();
        });
    }
    
    setKey_fileSave(key){
        this.configureKey('fileSave', key, function(e) {
            event.preventDefault();
            menuSave();
        });
    }
    
    setKey_fileOpen(key){
        this.configureKey('fileOpen', key, function(e) {
            event.preventDefault();
            menuOpen();
        });
    }
    
    setKey_tagIter(key){
        this.configureKey('tagIter', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.setNextStatus(); // Sets the current rows tag to the next tag
        });
    }
    
    setKey_downRowShrt(key){            
        this.configureKey('downRowShrt', key, function(e) {
            event.preventDefault();
            ta.goDown();
        });
    }

    setKey_upRowShrt(key){            
        this.configureKey('upRowShrt', key, function(e) {
            event.preventDefault();
            ta.goUp();
        });
    }

    setKey_zoomIn(key){            
        this.configureKey('zoomIn', key, function(e) {
            let size = ta.content.css('font-size');
            size.split("px");
            size = parseInt(size);
            size -= 1;
            if(size < 10){size = 10;}
            ta.content.css('font-size', size +'px');
            event.preventDefault();
        });
    }

    setKey_zoomOut(key){            
        this.configureKey('zoomOut', key, function(e) {
            let size = ta.content.css('font-size');
            size.split("px");
            size = parseInt(size);
            size += 1;
            if(size > 40){size = 40;}
            ta.content.css('font-size', size+'px');
            event.preventDefault();
        });
    }

    setKey_moveRowDown(key){            
        this.configureKey('moveRowDown', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.moveRowDown();
        });
    }

    setKey_moveRowUp(key){            
        this.configureKey('moveRowUp', key, function(e) {
            sh.keyPressed = 1;
            event.preventDefault();
            ta.moveRowUp();
        });
    }

    setKey_showHistory(key){        
        this.configureKey('showHistory', key, function(e) {
            console.log(hist.history);
        });
    }

    setKey_toogleDeveloper(key){        
        this.configureKey('toogleDeveloper', key, function(e) {
            require('electron').remote.getCurrentWindow().toggleDevTools();
        });
    }

  }
  
  module.exports = Shortcuts;

  console.log("Imported : ", "shortcuts.js");