console.log("Importing: ", "index.js");

var ta = new TextArea(".TextArea");
var sh = new Shortcuts(ta);

// Clicking on empty space focuses on the current target row
$("html").click(function (){
    ta.setCaretToEnd();
});

console.log("Imported : ", "index.js");