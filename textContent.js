// Objects containing basic functions for manipulating the text object
// assumes jQuery is included

module.exports = class textContent {
    constructor(contentID){
        this.contentID = contentID;
        this.content = $("#" + this.contentID);
    }
    
    // PRIVATE! Meant for use within the textContent class only
    getCaretPosition (ctrl) {
        // IE < 9 Support
        if (document.selection) {
            ctrl.focus();
            var range = document.selection.createRange();
            var rangelen = range.text.length;
            range.moveStart ('character', -ctrl.value.length);
            var start = range.text.length - rangelen;
            return {'start': start, 'end': start + rangelen };
        }
        // IE >=9 and other browsers
        else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
            return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
        } else {
            return {'start': 0, 'end': 0};
        }
    }

    // PRIVATE! Meant for use within the textContent class only
    setCaretPosition(ctrl, start, end) {
        // IE >= 9 and other browsers
        if(ctrl.setSelectionRange)
        {
            ctrl.focus();
            ctrl.setSelectionRange(start, end);
        }
        // IE < 9
        else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    }

    setPosition(start, end){
        var elm = document.getElementById(this.contentID);
        this.setCaretPosition(elm, start,end);
    }
    
    getPosition(){ 
        var elm = document.getElementById(this.contentID);
        var pos = this.getCaretPosition(elm);
        return pos;
    }

    // Sets height scroll of text area to focus on given line number 
    setLineNumber(line)
    {
      var ta = document.getElementById(this.contentID);
      console.log("Line Height jq: " + this.content.css('line-height'));
      console.log("Line Height: " + ta.style.lineHeight);
      var jump = (line - 1) *  this.content.css('line-height').replace('px','');
      console.log("Jump: " + jump);
      ta.scrollTop = jump;
      ta.scrollLeft = 0;
    }

    getLineNumber(){
        var limit = this.getPosition().start;
        var content = this.getContent();
        var index = 0;
        var count = 0;
        // Linear search 
        while (index < limit && index < content.length){
            if(content[index] == "\n") count++;
            index++;
        }
        return count;
    }
    
    getContent (){
        return this.content.val(); 
    }

    getContentLines (){
        return this.getContent().split("\n");
    }

    setContent (newContents){
        this.content.val(newContents);
    }

}