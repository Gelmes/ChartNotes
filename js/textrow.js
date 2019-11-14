
var $ = require("jquery");

TAB_WIDTH = 2;
TAB_WIDTH_OG = 0.5;

class TextRow{
    constructor(options) {
      // General Variables
      

      // Variables that can be passed to constructor and their default values
      const defaults = {
        parent: null,
        content: null,
        index: null,
        id: 0,
        level: 0
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
      else { this.parent.content.html(this.genRowHtml(this.id)); }

      this.content.focusin(() => {this.setAsTarget();});

      // Set tabs according to set level
      if(this.level){
        let counter = this.level;
        while(counter--){
          this.addTab();
        }
      }

    }

  setContent (str){
    this.content.html(str);
  }

  reset(){
    this.setContent("");
    this.level = 0;    
  }

  setAsTarget(){
    var index = $(".textrow").index(this.content);
    this.parent.setTargetRow(index);

    return index;
  }

  genRowHtml(id){
    return "<div id='" + id + "' class='textrow mousetrap' contenteditable='true' style='display: none;'>row</div>";
  }

  addRowAt(index){
      if(index === 0) {
        this.parent.content.prepend(this.genRowHtml(this.id));  
        this.content =  $(this.parent.element + " #" + this.id);
      }  else {
        $(this.parent.element + " > :nth-child(" + (index) + ")").after("<div id='" + this.id + "' class='textrow mousetrap' contenteditable='true' style='display: none;'>row " + this.id + "</div>");
        this.content =  $(this.parent.element + " > :nth-child(" + (index+1) + ")");
        
      }
      if(this.parent.fade){
        this.content.fadeIn();
      } else{
        this.content.show();
      }
  }

  delete(){
    this.content.remove();
  }

  addTab(){
    this.content.css("padding-left", (this.level * TAB_WIDTH + TAB_WIDTH_OG) + "em");
  }

  removeTab(){
    this.content.css("padding-left", (this.level * TAB_WIDTH + TAB_WIDTH_OG) + "em");
  }

  increaseLevel(){
    this.level += 1;
    this.addTab();
  }

  decreaseLevel(){
    if(this.level > 0) { this.level--;}
    this.removeTab();
  }

  getLevel(){
    return this.level;
  }

  focus(){
    this.content.focus();
  }

  setCaretToPos(pos){
    var el = this.content[0];
    if(this.content.text().length){
      if(pos > this.content.text().length || pos < 0){
        pos = this.content.text().length;
      }
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el.childNodes[0], pos);
      range.setEnd(el.childNodes[0], pos);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    }
  }

  setCaretToEnd(){
    this.setCaretToPos(-1);
  }

  get(){
    var dict = {};
    // this.praent will be an exception since it will create a cyclic list
    // we will later add it in the set method
    var except = ["parent","content"];
    for (var name in this){
        if(except.indexOf(name) < 0){
        dict[name] = eval("this." + name);
      }
    }
    dict["text"] = this.content.text();

    return dict;
  }
}

module.exports = TextRow;