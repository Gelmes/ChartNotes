const TextRow = require("./textrow.js");
var $ = require("jquery");

class TextArea{
  constructor(element) {
    this.element = element;
    this.content = $(element);
    this.rows = [];
    this.targetRowIndex = 0;
    this.rowCounter = 0; // Increments every time a new row gets added
    this.addRow();
  }

  setContent(str){
    this.content.html(str);
  }

  addRow(){
      this.addRowAt(this.getTargetRow());
  }

  appendRow(){
      let targetRow = this.getTargetRow() + 1;
      this.addRowAt(targetRow);
  }  

  addRowAt(index){
    var newLevel  = 0;
    if(index){ // If we are not row 0
      newLevel = this.rows[index-1].getLevel();
    }
    const tr = new TextRow({parent:this, index:index, id:this.rowCounter, level:newLevel});
    this.rowCounter += 1;
    this.rows.splice(index, 0, tr);
    this.setTargetRow(index);
    tr.focus();
  }

  setTargetRow(value){
    if(value < this.rows.length && value >= 0){
      //console.log("Setting length: " + value);
      this.targetRowIndex = value;
    }
  }

  getTargetRow(value){
    return this.targetRowIndex;
  }

  increaseLevel(){
    let targetRow = this.getTargetRow();
    if(targetRow != 0){
      // Check that the level of the current row does not increase more then one of the prev row
      if(this.rows[targetRow].getLevel() <= this.rows[targetRow-1].getLevel()){
        for(var i = targetRow+1; i < this.rows.length; i++){
          if(this.rows[targetRow].getLevel() < this.rows[i].getLevel()){
            this.rows[i].increaseLevel();
          } else {break};
        }
        this.rows[targetRow].increaseLevel();
      }
    }
  }

  goDown(){
    this.setTargetRow(this.getTargetRow() + 1);
    try{
      this.rows[this.getTargetRow()].focus();
    } catch (err){
    this.setTargetRow(this.getTargetRow() - 1);
    }
  }

  goUp(){
    this.setTargetRow(this.getTargetRow() - 1);
    try{
      this.rows[this.getTargetRow()].focus();
    } catch (err){
      this.setTargetRow(this.getTargetRow() + 1);
    }
  }

  // Gets a cleaned up version of TextArea with its variables and rows converted to a dictionary list
  // This is expected to be used along with the SaveAs feature and JSON.stringify
  get(){
    var dict = [];
    var except = ["rows"];
    for (var name in this){
        if(except.indexOf(name) < 0){
          
        console.log(name);
        dict[name] = eval("this." + name);
      }
    }
    // Special handling of except variables is required since they return circular lists
    var rows = []; //
    for (var i = 0; i < this.rows.length; i++){
            // make get statement for rows and add them to rows list
            rows.push(this.rows[i].get());
    }
    dict["rows"] = rows;

    return dict;

  }

}

module.exports = TextArea;