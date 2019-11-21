class Tag{
   constructor(){
       this.name = "";
       this.color = "0x00FF00";
       this.priority = 0;
   } 
}

class Tags{
    constructor(){
        this.tagValues = {};
        this.tagKeys = [];
        this.addTag("Not Started");
        this.setTagColor("Not Started", "rgba(255,0,26,0.2)")
        this.addTag("In Progress");
        this.setTagColor("In Progress", "rgba(233,168,0,0.2)")
        this.addTag("Complete");
        this.setTagColor("Complete", "rgba(0,135,107,0.2)")
    }
    addTag(tag){
        this.tagList[tag] = new Tag();
        this.tagKeys.push(tag);
    }
    removeTag(tag){
        delete this.tagList[tag];
        const index = array.indexOf(tag);
        if(index !== -1){
            this.tagKeys.splice(index,1);
        }
    }
    setTagColor(tag, color){
        this.tagList[tag].color = color;
    }
    getTagColor(){
        return this.tagList[tag].color;
    }
}