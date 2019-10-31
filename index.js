const TextArea = require("./js/textarea.js")
const Shortcuts = require("./js/shortcuts.js")
var $ = require("jquery");

var ta = new TextArea(".TextArea");
var sh = new Shortcuts(ta);

// function setup(){
//     console.log("HTML HAS LOADED!!!");
//     ta = new TextArea(".TextArea");
//     sh = new Shortcuts(ta);
// }

// $(document).ready(function () {
//     setup();
// });


module.exports = {
    ta,
    sh
}