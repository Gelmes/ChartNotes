class TextRow{
    constructor(options) {
      const defaults = {
        parent: null,
        content: null,
        index: null
      };
      const populated = Object.assign(defaults, options);
      for (const key in populated) {
        if (populated.hasOwnProperty(key)) {
          this[key] = populated[key];
        }
      }
      if (this.index != null){ this.addRowAt(this.index); } 
      else { this.parent.content.html(this.getHtml()); }
    }

  setContent = function (str){
    this.content.html(str);
  }

  getHtml = function(){
      return "<div class='textrow' contenteditable='true'>row</div>";
  }

  addRowAt = function(index){
      if(index === 0) {
        this.parent.content.prepend(this.getHtml());  
        this.content =  $(this.parent.element + " :first-child");
      }  else {
        $(this.parent.element + " > :nth-child(" + (index) + ")").after("<div class='textrow' contenteditable='true'>row " + index + "</div>");
        this.content =  $(this.parent.element + " > :nth-child(" + (index+1) + ")");
      }``
  }

  focus = function(){
    this.content.focus();
  }
}

module.exports = TextRow;