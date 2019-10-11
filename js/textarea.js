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
    //   this.rows.push(new TextRow({parent:this}));      
    //   this.targetRowIndex = this.rows.length - 1;
      this.addRowAt(this.targetRowIndex);
  }

  addRowAt = function(index){
      this.targetRowIndex = index + 1;
      this.rows.splice(index, 0, new TextRow({parent:this, index:index}));
  }


}

module.exports = TextArea;