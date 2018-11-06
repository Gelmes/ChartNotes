function getCaretPosition (ctrl) {
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


function setCaretPosition(ctrl, start, end) {
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


function setPosition(start, end){
    var elm = document.getElementById("editor");
    setCaretPosition(elm, start,end);
}

function getPosition(){ 
    var elm = document.getElementById("editor");
    var pos = getCaretPosition(elm);
    return pos;
}

$( document ).ready(function() {

    $("#editor").on('keydown', null, function(e) { 
        var keyCode = e.keyCode || e.which; 
      
        if (keyCode == 9) { 
          e.preventDefault(); 
          // call custom function here
          var contents = $("#editor").val();
          console.log(contents);
          
          var curStart = getPosition().start;
          var upper = contents.slice(0,curStart);
          var lower = contents.slice(curStart, contents.length);
          $("#editor").val(upper + "\n─ " + lower);
        } 
    });
});