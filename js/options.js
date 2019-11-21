class option{
   constructor(){
       this.name = "";
       this.color = "0x00FF00";
       this.priority = 0;
   } 
}

class Options{
    constructor(){
        this.name = ""
        this.list = {};
        this.keys = [];
        this.addOption("Not Started");
        this.setOptionColor("Not Started", "rgba(255,0,26,0.2)");
        this.addOption("In Progress");
        this.setOptionColor("In Progress", "rgba(233,168,0,0.2)");
        this.addOption("Complete");
        this.setOptionColor("Complete", "rgba(0,135,107,0.2)");
        this.addOption("Default");
        this.setOptionColor("Default", "#eee");
    }
    addOption(option){
        this.list[option] = new Option();
        this.list[option].name = option;
        this.keys.push(option);
    }
    removeOption(option){
        delete this.list[option];
        const index = array.indexOf(option);
        if(index !== -1){
            this.keys.splice(index,1);
        }
    }
    setOptionColor(option, color){
        this.list[option].color = color;
    }
    getOptionColor(){
        return this.list[option].color;
    }
}


module.exports = Options;