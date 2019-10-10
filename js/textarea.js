const TextRow = require("./textrow.js");

class TextArea{
  constructor(element) {
    this.content = $(element);
    this.rows = [];
    this.addRow();
  }

  setContent = function (str){
    this.content.html(str);
  }

  addRow = function(){
      this.rows.push(new TextRow(this));
  }
}

module.exports = TextArea;