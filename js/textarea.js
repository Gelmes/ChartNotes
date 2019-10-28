const TextRow = require("./textrow.js");

class TextArea{
  constructor(element) {
    this.element = element;
    this.content = $(element);
    this.rows = [];
    this.targetRowIndex = 0;
    this.addRow();
  }

  setContent = function (str){
    this.content.html(str);
  }

  addRow = function(){
      this.addRowAt(this.getTargetRow());
  }

  addRowAt = function(index){
    this.setTargetRow(this.getTargetRow() + 1);
      const tr = new TextRow({parent:this, index:index});
      this.rows.splice(index, 0, tr);
      tr.focus();
  }

  setTargetRow = function(value){
    if(value < this.rows.length && value >= 0){
      console.log("Setting length: " + value);
      this.targetRowIndex = value;
    }
  }

  getTargetRow = function(value){
    return this.targetRowIndex;
  }

  goDown = function(){
    this.setTargetRow(this.getTargetRow() + 1);
    try{
      console.log("try: " + this.getTargetRow());
      this.rows[this.getTargetRow()].focus();
      console.log("try: " + this.getTargetRow());
    } catch (err){
      console.log("catch: " + this.getTargetRow());
    this.setTargetRow(this.getTargetRow() - 1);
      console.log("catch: " + this.getTargetRow());
    }
    console.log("goDown: " + this.getTargetRow());
  }

  goUp = function(){
    this.setTargetRow(this.getTargetRow() - 1);
    try{
      this.rows[this.getTargetRow()].focus();
    } catch (err){
    this.setTargetRow(this.getTargetRow() + 1);
  }
    console.log("goUp  : " + this.getTargetRow());
  }


}

module.exports = TextArea;