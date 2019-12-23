console.log("Importing: ", "index.js");

var ta = new TextArea(".TextArea");
var sh = new Shortcuts(ta);
var hist = new History();

// NOTE: Causes cursor to go to the end when you try to click a row and edit something in the middle of the row.
// Clicking on empty space focuses on the current target row
// $("html").click(function (){
//     ta.setCaretToEnd();
// });

console.log("Imported : ", "index.js");