class Shortcuts{
    constructor(texbox) {
      this.texbox = texbox;
      this.texbox.content.keydown((event) =>this.handleKeyDown(event));
    }

    handleKeyDown(event){
        console.log("Key: " + event.key);
        switch(event.key){
            case "Enter": event.preventDefault(); this.handleEnter(); break;
            default: console.log("Unhandled Key");
        }
    }
    
    handleEnter = function(){
        console.log("Handle Enter");
        this.texbox.addRow();
    }

  }
  
  module.exports = Shortcuts;