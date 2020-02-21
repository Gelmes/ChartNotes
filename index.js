console.log("Importing: ", "index.js");

var ta          = new TextArea(".TextArea");
var control     = new Controller();
var hist        = new History(ta);  // Must be added last to controller to capture actions
var prehist     = new PreHistory(ta, hist);  // Must be added last to controller to capture actions

control.addModel(prehist);
control.addModel(ta);
control.addModel(hist);     // Must be added last to capture actions

var revert      = new Revert(ta);
var undo        = new Undo(ta, hist, revert);

var actions     = new ActionHandler(ta, hist);
var sh          = new Shortcuts(ta);

// NOTE: Causes cursor to go to the end when you try to click a row and edit something in the middle of the row.
// Clicking on empty space focuses on the current target row
// $("html").click(function (){
//     ta.setCaretToEnd();
// });

console.log("Imported : ", "index.js");