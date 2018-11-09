
/* Example
Options
├─ Apple
└─ tree
   ├─ banana
   ├─ orange
   └─ Avocado
*/
var treeSymbols = ["└","─", "│","├", " "];		// determine how to draw the tree view
//var treeSymbols = ["1","2", "3","4", "5"];		// determine how to draw the tree view
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
	while(treeSymbols.indexOf(str[index]) != -1 && index > 0){
		index--;
	}
	return (str[index] == "\n" || index == 0);
}

// Gets the prependix using cursor position
function getPrependix(str, curPos){
	var index = curPos;
	var prependix = "";
	while( str[index] != "\n" && index > -1) index--; // Go to the start of line
	index++;
	while(treeSymbols.indexOf(str[index]) != -1){
		console.log("Prependix: " + str[index] + " index: " + index);
		prependix += str[index];
		index++;
	}
	return prependix;
}

// Get prependix from the given line number
function getPrependixFromLine(str, line){
	var index = 0;    // keeps track of the cursor position
	var counter = 0;  // counts the number of new line characters encountered
	// Go to line number
	while(index < str.length && counter != line ){
		if(str[index] == "\n") counter++;
		index++;
	}
	var prependix = "";
	while(treeSymbols.indexOf(str[index]) != -1){
		prependix += str[index];
		index++;
	}
	var string = str.substring(index, str.length);
	return [prependix, string];

}

// function getChildPrependix(str, line){
// 	var pendixStr = getPrependixFromLine(str, line);
// 	var pendix = pendixStr[0];
// 	if(line){
// 		var parentPendix = getPrependixFromLine(str, line-1)[0];
// 		if(pendix.length <= parentPendix.length){
// 			pendix = pendix.substring(0, pendix.length - 3);
// 			var ts = treeSymbols; // Just meant to help shorten things up
// 			pendix +=  ts[4] + ts[4] + ts[4] + ts[0] + ts[1] + ts[4];
// 		}
// 	}
// 	return [pendix, pendixStr[1]];
// }

function getChildPrependix(prevLine, curLine){
	var prevPendix 		= getPrependixFromLine(prevLine, 0)[0];
	var curPendixStr 	= getPrependixFromLine(curLine, 0);
	var curPendix 		= curPendixStr[0];
	if(curPendix.length <= prevPendix.length){
		curPendix = curPendix.substring(0, curPendix.length - 3);
		var ts = treeSymbols; // Just meant to help shorten things up
		curPendix +=  ts[4] + ts[4] + ts[4] + ts[0] + ts[1] + ts[4];
	}
	return [curPendix, curPendixStr[1]];
}

// Searches for a cousin line below
function getLowerCousin(lines, lineNumber){
	var lineIndex = lineNumber;
	var pendix = getPrependixFromLine(lines[lineIndex], 0)[0];
	while(lineIndex < (lines.length-1)){
		lineIndex++; // Next line
		var nextPendix = getPrependixFromLine(lines[lineIndex], 0)[0];
		//if(pendix.length > nextPendix.length) return false;
		if(pendix.length == nextPendix.length) return true;
	}
	return false;
}

// Searches for a cousin line below
function handleCousins(lines, lineNumber){
	var lineIndex = lineNumber;
	var pendixStr = getPrependixFromLine(lines[lineIndex], 0);
	var pendix = pendixStr[0];
	var connect = 0;
	// Searches for cousins
	while(lineIndex < (lines.length-1)){
		lineIndex++; // Next line
		var childPendixStr = getPrependixFromLine(lines[lineIndex], 0);
		if(pendix.length == childPendixStr[0].length) connect = 1; break;
		if(pendix.length >  childPendixStr[0].length) break;
	}
	console.log("Connect: " + connect);

	var prevPendix 	= getPrependixFromLine(lines[lineNumber-1], 0)[0];
	if(pendix.length <= prevPendix.length){
		// Any children get shifted to the right along with current line
		lineIndex = lineNumber;
		while(lineIndex < (lines.length-1)){
			lineIndex++; // Next line
			var childPendixStr = getPrependixFromLine(lines[lineIndex], 0);
			if(pendix.length <  childPendixStr[0].length){
				var pendixSplit = pendix.length - 3 ; // Location where we will split the pendix
				var pendixCon = (connect ? treeSymbols[2] : "");
				var pendixLow = childPendixStr[0].substring(0,pendixSplit);
				var pendixMid = treeSymbols[4] + treeSymbols[4] + treeSymbols[4];
				var pendixHig = childPendixStr[0].substring(pendixSplit) ; 
				console.log("High: " + pendixHig);
				console.log("High childPendixStr: " + childPendixStr[0]);
				lines[lineIndex] =  pendixLow + pendixCon + pendixMid + pendixHig + childPendixStr[1];
			}
			//if(pendix.length == childPendixStr[0].length) return true;
			if(pendix.length >  childPendixStr[0].length) break;
		}


		pendix = pendix.substring(0, pendix.length - 3);
		var ts = treeSymbols; // Just meant to help shorten things up
		if(connect) pendix +=  ts[2] + ts[4] + ts[4] + ts[0] + ts[1] + ts[4];
		else      	pendix +=  ts[4] + ts[4] + ts[4] + ts[0] + ts[1] + ts[4];
	}
	lines[lineNumber] = pendix + pendixStr[1];
	return lines;
}

function handleTab(str, line){
	if(line == 0) return str; // Tab does nothing on the first line

	// Get new prependix
	var lines = str.split("\n"); 				// Separate the string into lines
	//var cousin = getLowerCousin(lines, line);	// Determines if we have couzins
	var lines = handleCousins(lines, line);	// Determines if we have couzins

	//var pendixStr = getChildPrependix(lines[line-1], lines[line]); // Creates a child prependix
	//console.log("Child pendix:" + pendixStr[0])

	//lines[line] = pendixStr[0] + pendixStr[1];

	var index = 0;
	var sResult = "";
	while(index < lines.length - 1){
		sResult += lines[index] + "\n";
		index++;
	}
	sResult += lines[index]; // The last line does not need a new line character
	return sResult;

	// // Replace old prependix with new one
	
	// // Get lower lines
	// var lower = ""
	// var counter = 0;
	// var index = 0;
	// while(counter < line && index < str.length){
	// 	if(str[index] == "\n") counter++;
	// 	lower += str[index];
	// 	index++;
	// }

	// // remove old prependix by moving index over it
	// while(treeSymbols.indexOf(str[index]) != -1 || str[index] == "\n") index++;

	// // get upper lines
	// var upper = ""
	// while(index < str.length){
	// 	upper += str[index];
	// 	index++;
	// }

	// return lower + newPendix + upper;
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
		var upper = contents.slice(0,curStart);
		var lower = contents.slice(curStart, contents.length);
		console.log("In prependix: " + getInPrependix(contents, curStart));
		if(getInPrependix(contents, curStart)){
			if (keyCode == 9) { // Tab 
				e.preventDefault(); 
				// call custom function here         
				//$("#editor").val(upper + "\n─ " + lower);
				//setPosition(curStart + 3,curStart + 3); // + 3 to include all three aditional characters
				var lineNumber = countInstanses(contents, "\n", curStart);
				console.log("Line number: " + lineNumber);
				//console.log(getPrependix(contents, curStart));
				//console.log(getPrependixFromLine(contents, lineNumber));
				var newContents = handleTab(contents, lineNumber);
				$("#editor").val(newContents);
				if(contents.length < newContents.length){
					setPosition(curStart + 3,curStart + 3); // + 3 to include all three aditional characters
				}
				
				//setLineNumber(lineNumber);
			}

			switch(keyCode){
				case 9 : break;
				case 13: break;
				case 8 : break;
				case 16: break;
				default: break;
			}
		} else{
			switch(keyCode){
				case 9 : 
					e.preventDefault(); 
					$("#editor").val(upper + "\t" + lower);
					setPosition(curStart + 1,curStart + 1); // + 3 to include all three aditional characters
					break;
				case 13: break;
				case 8 : break;
				case 16: break;
				default: break;
			}
		}
		
		preKeyCode = keyCode;
    });
});