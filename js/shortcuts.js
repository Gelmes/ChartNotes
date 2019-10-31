const Mousetrap = require("mousetrap");

class Shortcuts{
    constructor(texbox) {
        this.texbox = texbox;
        //this.texbox.content.keydown((event) =>this.handleKeyDown(event));
        this.shortcuts = {
            'newRow' : 'enter',
            'downRow' : 'down',
            'upRow' : 'up',
            'incLevel' : 'tab'
        }
        this.setKey_newRow(this.shortcuts['newRow']);
        this.setKey_downRow(this.shortcuts['downRow']);
        this.setKey_upRow(this.shortcuts['upRow']);
        this.setKey_incLevel(this.shortcuts['incLevel']);
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
            event.preventDefault();
            ta.increaseLevel();
        });
    }

  }
  
  module.exports = Shortcuts;