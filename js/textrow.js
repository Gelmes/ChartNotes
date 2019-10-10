class TextRow{
  constructor(parent) {
    this.parent = parent;
    this.content = this.parent.content.append("<div class='textrow' contenteditable='true'>row</div>");
  }

  setContent = function (str){
    this.content.html(str);
  }
}

module.exports = TextRow;