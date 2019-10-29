
var $ = require("jquery");

class TextRow{
    constructor(options) {
      // General Variables
      this.level = 0;

      // Variables that can be passed to constructor and their default values
      const defaults = {
        parent: null,
        content: null,
        index: null
      };

      // Copies the passed values to the default value list
      const populated = Object.assign(defaults, options);

      // Copies the default values to `this` variable value equivalents
      for (const key in populated) {
        if (populated.hasOwnProperty(key)) {
          this[key] = populated[key];
        }
      }

      // Adds the rows html code to the parents html
      if (this.index != null){ this.addRowAt(this.index); } 
      else { this.parent.content.html(this.getHtml()); }


    }

  setContent (str){
    this.content.html(str);
  }

  getHtml(){
      return "<div class='textrow' contenteditable='true'>row</div>";
  }

  addRowAt(index){
      if(index === 0) {
        this.parent.content.prepend(this.getHtml());  
        this.content =  $(this.parent.element + " :first-child");
      }  else {
        $(this.parent.element + " > :nth-child(" + (index) + ")").after("<div class='textrow' contenteditable='true'>row " + index + "</div>");
        this.content =  $(this.parent.element + " > :nth-child(" + (index+1) + ")");
      }``
  }

  increaseLevel(){
    this.level += 1;
  }

  getLevel(){
    return this.level;
  }

  focus(){
    this.content.focus();
  }
}

module.exports = TextRow;