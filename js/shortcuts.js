const Mousetrap = require("mousetrap");

class Shortcuts{
    constructor(texbox) {
        this.texbox = texbox;
        //this.texbox.content.keydown((event) =>this.handleKeyDown(event));
        this.shortcuts = {
            'newRow' : 'enter',
            'downRow' : 'ArrowDown',
            'upRow' : 'ArrowUp'
        }
        this.setKey_newRow(this.shortcuts['newRow']);
    }
    
    // handleKeyDown(event){
    //     console.log("Key: " + event.key);
    //     switch(event.key){
    //         case "Enter"    : event.preventDefault(); this.handleEnter(); break;
    //         case "ArrowDown": event.preventDefault(); this.handleDown (); break;
    //         case "ArrowUp"  : event.preventDefault(); this.handleUp   (); break;
    //         default: console.log("Unhandled Key");
    //     }
    // }
    setKey_newRow(key){
        Mousetrap.unbind(this.shortcuts['newRow']);
        this.shortcuts['newRow'] = key;
        Mousetrap.bind(key, function(e) {
            event.preventDefault();
            console.log(key);
            ta.appendRow();
        });

    }

    handleEnter(){
        

        Mousetrap.bind('enter', function(e) {
            event.preventDefault();
            console.log("Key down");
            ta.appendRow();
        });

        this.texbox.appendRow();
    }
    
    handleDown(){
        this.texbox.goDown();
    }
    
    handleUp(){
        this.texbox.goUp();
    }

    handleTab(){
        this.texbox.increaseLevel();
    }

  }
  
  module.exports = Shortcuts;