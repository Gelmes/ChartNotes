
/* Example
Options
├─ Apple
└─ tree
   ├─ banana
   ├─ orange
   └─ Avocado
*/
var textContent = require('./textContent');

var treeSymbols = ["└","─", "│","├", " "];		// determine how to draw the tree view
//var treeSymbols = ["1","2", "3","4", "5"];		// determine how to draw the tree view
var preKeyCode = 0;

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
$( document ).ready(function() {
	
	const tc = new textContent('editor');
	tc.getContent();

    $("#editor").on('keydown', null, function(e) { 
		var keyCode = e.keyCode || e.which; 
		// Tab 9
		// Enter 13 
		// Back 8
		// Shift 16
		// Shift Tab? mest keep track of previous key press


		var contents = tc.getContent(); 
		var curStart = tc.getPosition().start;
		var upper = contents.slice(0,curStart);
		var lower = contents.slice(curStart, contents.length);
		console.log("In prependix: " + getInPrependix(contents, curStart));
		if(getInPrependix(contents, curStart)){
			if (keyCode == 9) { // Tab 
				e.preventDefault(); 
				// call custom function here         
				//$("#editor").val(upper + "\n─ " + lower);
				//setPosition(curStart + 3,curStart + 3); // + 3 to include all three aditional characters
				var lineNumber = tc.getLineNumber();
				console.log("Line number: " + lineNumber);
				//console.log(getPrependix(contents, curStart));
				//console.log(getPrependixFromLine(contents, lineNumber));
				//var newContents = handleTab(contents, lineNumber);
				tc.setContent(newContents);
				if(contents.length < newContents.length){
					tc.setPosition(curStart + 3,curStart + 3); // + 3 to include all three aditional characters
				}
				
				//tc.setLineNumber(lineNumber);
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
					tc.setPosition(curStart + 1,curStart + 1); // + 3 to include all three aditional characters
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