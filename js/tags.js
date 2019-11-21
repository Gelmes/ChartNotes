class option{
   constructor(){
       this.name = "";
       this.color = "0x00FF00";
       this.priority = 0;
   } 
}

class Options{
    constructor(){
        this.optionValues = {};
        this.optionKeys = [];
        this.addOption("Not Started");
        this.setOptionColor("Not Started", "rgba(255,0,26,0.2)")
        this.addOption("In Progress");
        this.setOptionColor("In Progress", "rgba(233,168,0,0.2)")
        this.addOption("Complete");
        this.setOptionColor("Complete", "rgba(0,135,107,0.2)")
    }
    addOption(option){
        this.optionList[option] = new Option();
        this.optionKeys.push(option);
    }
    removeOption(option){
        delete this.optionList[option];
        const index = array.indexOf(option);
        if(index !== -1){
            this.optionKeys.splice(index,1);
        }
    }
    setOptionColor(option, color){
        this.optionList[option].color = color;
    }
    getOptionColor(){
        return this.optionList[option].color;
    }
}


module.exports = Tags;