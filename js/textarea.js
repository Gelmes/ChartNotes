console.log("Importing: ", "textarea.js");
var rowStatus = new Options();

class TextArea{
  constructor(element) {
    this.element = element;
    this.content = $(element);
    this.rows = [];
    this.targetRowIndex = 0;
    this.prevTargetRowIndex = 0;
    this.rowCounter = 0; // Increments every time a new row gets added,
    this.fade = 1;
    this.initRow();
  }

  setContent(str){
    this.content.html(str);
  }

  getRowContent(){
    return this.getRowContentIndex(this.getTargetRow());
  }

  getRowContentIndex(row){
    return this.rows[row].getContent();
  }

  setRowContent(str){
    this.rows[this.getTargetRow()].setContent(str);
  }

  initRow(){
      this.newRowAt(this.getTargetRow());
  }

  newRow(){
      let targetRow = this.getTargetRow() + 1;
      this.newRowAt(targetRow);
  }  

  deleteRow(){    
    if(this.getTargetRow()){
      this.rows[this.getTargetRow()].delete();
      this.rows.splice(this.getTargetRow(), 1);
      if(this.getTargetRow() == this.rows.length){
        this.setTargetRow(this.getTargetRow()-1);
      }
      this.rows[this.getTargetRow()].setCaretToEnd();
    }
  }

  backspaceRow(position){
    if(position == 0){
      var target = this.getTargetRow();
      if(this.rows[target].level){
        this.decreaseLevel();
      } else{
        this.deleteRow();
        if(target < this.rows.length){
          this.upRow();
        }
      }
    } else{
      this.rows[this.getTargetRow()].backspace(position);
    }
  }

  newRowAt(index){
    var newLevel  = 0;
    if(index){ // If we are not row 0
      newLevel = this.rows[index-1].getLevel();
    }
    const tr = new TextRow({parent:this, index:index, id:this.rowCounter, level:newLevel});
    this.rowCounter += 1;
    this.rows.splice(index, 0, tr);
    // this.setTargetRow(index);
    tr.setCaretToEnd(); // automatically sets the targetRow
    this.content.css('margin-top','0');
  }

  moveRowUp(){
    let targetRow = this.getTargetRow();
    if(targetRow != 0){
      let row = this.rows[targetRow];
      row.content.prev().insertAfter(row.content);
      let preRow = this.rows[targetRow - 1];
      this.rows[targetRow - 1] = this.rows[targetRow];
      this.rows[targetRow] = preRow;
      this.setTargetRow(targetRow - 1);
    }
  }

  moveRowDown(){
    let targetRow = this.getTargetRow();
    if(targetRow != this.rows.length - 1){
      let row = this.rows[targetRow];
      row.content.next().insertBefore(row.content);
      let nextRow = this.rows[targetRow + 1];
      this.rows[targetRow + 1] = this.rows[targetRow];
      this.rows[targetRow] = nextRow;
      this.setTargetRow(targetRow + 1);
    }
  }

  setTargetRow(value){
    if(value < this.rows.length && value >= 0){
      this.prevTargetRowIndex  = this.targetRowIndex;
      this.targetRowIndex = value;
    }
  }

  setCaretToEnd(){
    this.rows[this.getTargetRow()].setCaretToEnd();
  }

  nextStatus(){
    const targetRow = this.getTargetRow();
    let   index = rowStatus.keys.indexOf(this.rows[targetRow].getStatus()) + 1; // Next Key
    if(index == -1){ index = 0;}                  // If the row does not have a status assigned
    if(index >= rowStatus.keys.length){ index = 0;}  // If the next index is outside of the list loop back
    const key = rowStatus.keys[index];

    this.rows[targetRow].setStatus(key);
    this.rows[targetRow].setBackgroundColor(rowStatus.list[key].color);
  }

  prevStatus(){
    const targetRow = this.getTargetRow();
    let   index = rowStatus.keys.indexOf(this.rows[targetRow].getStatus());
    if(index == -1){ index = 0;}                            // If the row does not have a status assigned
    else if(index == 0){ index = rowStatus.keys.length-1 }  // Set to the end of the row to loop around
    else { index = index-1 }
    const key = rowStatus.keys[index];

    this.rows[targetRow].setStatus(key);
    this.rows[targetRow].setBackgroundColor(rowStatus.list[key].color);
  }

  getStatus(){
    return this.rows[this.getTargetRow()].getStatus();
  }

  getTargetRow(){
    return this.targetRowIndex;
  }

  getPrevTargetRow(value){
    return this.prevTargetRowIndex;
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
    this.setTargetRow(this.getTargetRow());
  }

  decreaseLevel(){
    let targetRow = this.getTargetRow();
    
    if(targetRow != 0){
      if((targetRow < this.rows.length-1) && (this.rows[targetRow].getLevel() <= this.rows[targetRow+1].getLevel()) ){
        if(this.rows[targetRow].getLevel() <= this.rows[targetRow-1].getLevel()){
          return;
        }
      }
      
      for(var i = targetRow+1; i < this.rows.length; i++){
        if(this.rows[targetRow].getLevel() < this.rows[i].getLevel()){
          this.rows[i].decreaseLevel();
        } else {break};
      }
      this.rows[targetRow].decreaseLevel();
    }
    this.setTargetRow(this.getTargetRow());
  }

  getLevel(){
    return this.rows[this.getTargetRow()].getLevel();
  }

  downRow(){
    // this.setTargetRow(this.getTargetRow() + 1);
    try{
      this.rows[this.getTargetRow() + 1].setCaretToEnd();
    } catch (err){
      this.setTargetRow(this.getTargetRow());
      console.log(err);
      // throw err;
      // this.setTargetRow(this.getTargetRow() - 1);
    }
  }

  upRow(){
    // this.setTargetRow(this.getTargetRow() - 1);
    try{
      this.rows[this.getTargetRow() - 1].setCaretToEnd();
    } catch (err){
      this.setTargetRow(this.getTargetRow());
      console.log(err);
      // this.setTargetRow(this.getTargetRow() + 1);
    }
  }

  reset(){
    this.removeAllRows();
    this.setTargetRow(0);
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
      this.newRowAt(0);
      this.rows[0].setContent(dict["rows"][i].text);
      while(this.rows[0].level < dict["rows"][i].level){
        this.rows[0].increaseLevel();
      }
      this.rows[0].index = dict["rows"][i].index;
      this.rows[0].id = dict["rows"][i].id;
      if(dict["rows"][i].rowStatus){
        this.rows[0].rowStatus = dict["rows"][i].rowStatus;
        this.rows[0].setBackgroundColor(rowStatus.list[this.rows[0].rowStatus].color);
      }
    }

    var except = ["rows"];
    for (var key in dict){
      if(except.indexOf(key) < 0){
        this[key] = dict[key];
      }    
    }
    this.setTargetRow(this.rows.length-1);
    this.rows[this.getTargetRow()].setCaretToEnd();
  }
}

module.exports = TextArea;

console.log("Imported : ", "textarea.js");