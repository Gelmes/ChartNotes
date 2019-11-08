// Min functions that are called by the menu system
// Exit, Minimize, and Close functions can be found in titlebar.js

const { dialog } = require('electron').remote;
var fs = require('fs');
var path = require('path');
var $ = require("jquery");

function saveToFile(fileName){
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
        console.log('Failed to save the file !'); 
        //console.log(e);
    }
    clearFileChanges();
}

function menuSaveAs(){
    try{
       var fileName = dialog.showOpenDialogSync({ title:"Save As", buttonLabel:"Save", properties: ['openFile', 'promptToCreate'] })[0];
       if(fileName){
           WORKING_FILE = fileName;
           saveToFile(fileName);
       }
    } catch (e) {
        console.log('Save as canceled'); 
    }
}

function menuSave(){
    if(WORKING_FILE != ""){
        saveToFile(WORKING_FILE);
    } else {
        menuSaveAs();
    }
}

function menuOpen(){
    // try {
        var fileName = dialog.showOpenDialogSync({ properties: ['openFile'] })[0];
        if(fileName){
            var data = fs.readFileSync(fileName);
            var dict = JSON.parse(data);            
            setTimeout(function() {
                ta.set(dict);
            }, 250);
            WORKING_FILE = fileName;
            clearFileChanges();
        }
    // }
    // catch(e) { 
    //     console.log('Failed to open the file !'); 
    //     //console.log(e);
    // }

}

function menuNew(){
    try {
        ta.reset();
        ta.initRow();
        
        WORKING_FILE = null;
        $(".title").html("*");
    }
    catch(e) { 
        console.log('Failed to create new file !'); 
        //console.log(e);
    }

}