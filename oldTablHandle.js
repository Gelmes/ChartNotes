// Depricated code



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

	var prevPendixStr 	= getPrependixFromLine(lines[lineNumber-1], 0);
	var prevPendix 	= prevPendixStr[0];
	if(pendix.length <= prevPendix.length){
		// Any children get shifted to the right along with current line
		lineIndex = lineNumber;
		if(!connect){
			var index = prevPendixStr[0].length - 3;
			console.log("previousPendixStr: " + prevPendixStr[0]);
			console.log("previousPendixStr: " + prevPendixStr[0][prevPendixStr.length-1]);
			console.log("previousPendixStr: " + prevPendixStr[0].substring(0,index));
			console.log("previousPendixStr: " + treeSymbols[0]);
			console.log("previousPendixStr: " + prevPendixStr[0].substring(index+1));
			console.log("previousPendixStr: " + prevPendixStr[1]);
			lines[lineIndex - 1] = prevPendixStr[0].substring(0,index) + treeSymbols[0] + prevPendixStr[0].substring(index+1) + prevPendixStr[1];
		}

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
