// Min functions that are called by the menu system
// Exit, Minimize, and Close functions can be found in titlebar.js

const { dialog } = require('electron').remote;
const { TextRow } = require('./js/textrow.js');
var fs = require('fs');
var $ = require("jquery");

function menuSaveAs(){
    var fileName = dialog.showOpenDialogSync({ title:"Save As", buttonLabel:"Save", properties: ['openFile', 'promptToCreate'] })[0];
    console.log(fileName);
    var dict = {};
    dict = ta.get();
    var ditc_obj = {};
    for (var key in dict){
        ditc_obj[key] = dict[key];
    }

    var my_cars= {};
    my_cars["cool"]="Mustang";
    my_cars["family"]="Station Wagon";
    my_cars["big"]="SUV";
    console.log(ditc_obj);
    // console.log(my_cars);
    
    // console.log(dict);
    var content = JSON.stringify(ditc_obj, null, 4);
    console.log(content);
    try { fs.writeFileSync(fileName, content, 'utf-8'); }
    catch(e) { 
        alert('Failed to save the file !'); 
        console.log(e);
    }
}
