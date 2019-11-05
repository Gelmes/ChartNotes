// Min functions that are called by the menu system
// Exit, Minimize, and Close functions can be found in titlebar.js

const { dialog } = require('electron').remote;
const { TextRow } = require('./js/textrow.js');
var fs = require('fs');
var $ = require("jquery");

function menuSaveAs(){
    var fileName = dialog.showOpenDialogSync({ title:"Save As", buttonLabel:"Save", properties: ['openFile', 'promptToCreate'] })[0];

    var dict = {};
    dict = ta.get();
    var ditc_obj = {};
    // NOTE: Kind of dumb I have to do this
    // But copying the dictionary content
    // to this other dictionary converts it to an object
    // this allows it to work with JSON.stringify()
    // Not a big performence hit so no problem
    for (var key in dict){
        ditc_obj[key] = dict[key];
    }
    
    // console.log(dict);
    var content = JSON.stringify(ditc_obj, null, 4);
    try { fs.writeFileSync(fileName, content, 'utf-8'); }
    catch(e) { 
        alert('Failed to save the file !'); 
        console.log(e);
    }
}

function menuOpen(){
    console.log(ta["rowCounter"]);
    var fileName = dialog.showOpenDialogSync({ properties: ['openFile'] })[0];
    if(fileName){
        ta.reset();
    }
    
    var data = fs.readFileSync(fileName);
    var dict = JSON.parse(data);
    console.log(dict);
}
