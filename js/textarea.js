const TextRow = require("./textrow.js");
var $ = require("jquery");

class TextArea{
  constructor(element) {
    this.element = element;
    this.content = $(element);
    this.rows = [];
    this.targetRowIndex = 0;
    this.rowCounter = 0; // Increments every time a new row gets added,
    this.fade = 1;
    this.initRow();
  }

  setContent(str){
    this.content.html(str);
  }

  initRow(){
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
      this.targetRowIndex = value;
    }
  }

  getTargetRow(value){
    return this.targetRowIndex;
  }

  increaseLevel(){
    let targetRow = this.getTargetRow();
    if(targetRow != 0){
      // Check that the lfadeOutevel of the current row does not increase more then one of the prev row
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

  reset(){
    this.removeAllRows();
    this.targetRowIndex = 0;
    this.rowCounter = 0;
  }

  removeAllRows(){
    while( this.rows.length){
      var row = this.rows.pop();
      row.content.remove();
    }  
  }

  // Gets a cleaned up version of TextArea with its variables and rows converted to a dictionary list
  // This is expected to be used along with the SaveAs feature and JSON.stringify
  get(){
    var dict = [];
    var except = ["rows","content","element"];
    for (var name in this){
        if(except.indexOf(name) < 0){
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

  set(dict){
    
    if(this.fade){
      $(".textrow").fadeOut();
    } 
    this.reset();
    for (var i = dict["rows"].length-1; i >= 0; i--){
      this.addRowAt(0);
      this.rows[0].setContent(dict["rows"][i].text);
      while(this.rows[0].level < dict["rows"][i].level){
        this.rows[0].increaseLevel();
      }
      this.rows[0].index = dict["rows"][i].index;
      this.rows[0].id = dict["rows"][i].id;
    }

    var except = ["rows"];
    for (var key in dict){
      if(except.indexOf(key) < 0){
        this[key] = dict[key];
        console.log(key);
      }    
    }
  }
}

module.exports = TextArea;