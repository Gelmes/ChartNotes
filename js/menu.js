// Min functions that are called by the menu system
// Exit, Minimize, and Close functions can be found in titlebar.js

const { dialog } = require('electron').remote;
const { TextRow } = require('./js/textrow.js');
var fs = require('fs');
var $ = require("jquery");

function menuSaveAs(){
    var fileName = dialog.showOpenDialogSync({ title:"Save As", buttonLabel:"Save", properties: ['openFile', 'promptToCreate'] })[0];
    console.log(fileName);
    console.log(ta.get());

    // try { fs.writeFileSync(fileName, JSON.stringify(ta), 'utf-8'); }
    // catch(e) { 
    //     alert('Failed to save the file !'); 
    //     console.log(e);
    // }
}
