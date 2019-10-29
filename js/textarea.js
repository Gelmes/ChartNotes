const TextRow = require("./textrow.js");
var $ = require("jquery");

class TextArea{
  constructor(element) {
    this.element = element;
    this.content = $(element);
    this.rows = [];
    this.targetRowIndex = 0;
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
    const tr = new TextRow({parent:this, index:index});
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


}

module.exports = TextArea;