const TextArea = require("./js/textarea.js")
const Shortcuts = require("./js/shortcuts.js")
var fs = require('fs');
var $ = require("jquery");
var path = require('path');

var ta = new TextArea(".TextArea");
var sh = new Shortcuts(ta);

// Clicking on empty space focuses on the current target row
$("html").click(function (){
    ta.setCaretToEnd();
});


module.exports = {
    ta,
    sh
}