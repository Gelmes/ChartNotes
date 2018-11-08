

var treeSymbols = ["└","─", "│","├", " "];		// determine how to draw the tree view
var preKeyCode = 0;

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

// Counts the instanses of a character up to the provided limit
// this was originally designed to count the number of new lines
function countInstanses (str, delim, limit){
	var index = 0;
	var count = 0;
	// Linear search 
	while (index < limit && index < str.length){
		if(str[index] == delim) count++;
		index++;
	}
	return count;
}

// Gets the line number from the current cursor position
function getLineNumber(){

}

// The strings before the cu
//function getPrependix

// Sets height scroll of text area to focus on given line number 
function setLineNumber(line)
{
  var ta = document.getElementById("editor");
  console.log("Line Height jq: " + $('#editor').css('line-height'));
  console.log("Line Height: " + ta.style.lineHeight);
  var jump = (line - 1) *  $('#editor').css('line-height').replace('px','');
  console.log("Jump: " + jump);
  ta.scrollTop = jump;
  ta.scrollLeft = 0;

}

// Return weather cursor is in the prependix of the current line
function getInPrependix(str, curPos){        
	var index = curPos;
	index--;
	while(treeSymbols.indexOf(str[index]) != -1){
	    console.log("V: " + str[index]);
		index--;
	}
	return (str[index] == "\n");
}

$( document ).ready(function() {
    $("#editor").on('keydown', null, function(e) { 
		var keyCode = e.keyCode || e.which; 
		// Tab 9
		// Enter 13 
		// Back 8
		// Shift 16
		// Shift Tab? mest keep track of previous key press

		var contents = $("#editor").val(); 
		var curStart = getPosition().start;
		if(getInPrependix(contents, curStart)){
			if (keyCode == 9) { // Tab 
				e.preventDefault(); 
				// call custom function here         
				var upper = contents.slice(0,curStart);
				var lower = contents.slice(curStart, contents.length);
				$("#editor").val(upper + "\n─ " + lower);
				setPosition(curStart + 3,curStart + 3); // + 3 to include all three aditional characters
				var lineNumber = countInstanses(contents, "\n", curStart);
				console.log("Line number: " + lineNumber);
				//setLineNumber(lineNumber);
			}

			switch(keyCode){
				case 9 : break;
				case 13: break;
				case 8 : break;
				case 16: break;
			}
		}
		
		preKeyCode = keyCode;
    });
});