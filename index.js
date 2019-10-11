const TextArea = require("./js/textarea.js")
const Shortcuts = require("./js/shortcuts.js")
var $ = require("jquery");


$(document).ready(function () {
    ta = new TextArea(".TextArea");
    sh = new Shortcuts(ta);

});