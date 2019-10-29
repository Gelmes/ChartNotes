class Shortcuts{
    constructor(texbox) {
      this.texbox = texbox;
      this.texbox.content.keydown((event) =>this.handleKeyDown(event));
    }

    handleKeyDown(event){
        console.log("Key: " + event.key);
        switch(event.key){
            case "Enter"    : event.preventDefault(); this.handleEnter(); break;
            case "ArrowDown": event.preventDefault(); this.handleDown (); break;
            case "ArrowUp"  : event.preventDefault(); this.handleUp   (); break;
            default: console.log("Unhandled Key");
        }
    }
    
    handleEnter(){
        this.texbox.addRow();
    }
    
    handleDown(){
        this.texbox.goDown();
    }
    
    handleUp(){
        this.texbox.goUp();
    }

  }
  
  module.exports = Shortcuts;