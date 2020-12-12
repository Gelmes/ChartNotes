// Min functions that are called by the menu system
// Exit, Minimize, and Close functions can be found in titlebar.js

const { dialog, getGlobal } = require('electron').remote;
var fs = require('fs');
var path = require('path');
var $ = require("jquery");

$( document ).ready(function() {
    arguments = getGlobal('sharedObject').prop1;
    if(arguments.length == 2 && arguments[1] != "."){
        openFile(arguments[1]);
    }    
});

function saveToFile(fileName){
    let ext = path.extname(fileName);
    if(ext == ''){
        fileName += '.chn';
    }

    var taDict = ta.get();
    var dict_obj = {};
    // NOTE: Kind of dumb I have to do this
    // But copying the dictionary content
    // to this other dictionary converts it to an object
    // this allows it to work with JSON.stringify()
    // Not a big performence hit so no problem
    for (var key in taDict){
        dict_obj[key] = taDict[key];
    }

    var dict = {
        "version": 1,
        "textArea": dict_obj,
        "history": hist.get()
    };
    
    // console.log(dict);
    var content = JSON.stringify(dict, null, 4);
    try { fs.writeFileSync(fileName, content, 'utf-8'); }
    catch(e) { 
        console.log('Failed to save the file !'); 
        //console.log(e);
    }
    clearFileChanges();
}

function menuSaveAs(){
    try{
       var fileName = dialog.showSaveDialogSync({ title:"Save As", buttonLabel:"Save"});
       if(fileName){
           WORKING_FILE = fileName;
           $('title').html(path.basename(WORKING_FILE));
           saveToFile(fileName);
       }
    } catch (e) {
        console.log('Save as was canceled'); 
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
    var fileName = dialog.showOpenDialogSync({ properties: ['openFile'] })[0];
    openFile(fileName);

}
function openFile(fileName){
    try {
        if(fileName){
            var data = fs.readFileSync(fileName);
            var dict = JSON.parse(data);   
            if(!("version" in dict))
            {
                setTimeout(function() {
                    ta.set(dict);
                }, 250);
            }     
            else
            {
                setTimeout(function() {
                    ta.set(dict["textArea"]);
                    hist.set(dict["history"]);
                }, 250);
            }    

            WORKING_FILE = fileName;
            $('title').html(path.basename(WORKING_FILE));
            clearFileChanges();
        }
    }
    catch(e) { 
        console.log('Failed to open the file: ' + fileName); 
        console.log(e);
    }

}

function menuNew(){
    try {
        ta.reset();
        ta.initRow();
        
        WORKING_FILE = "";
        $('title').html('Untitled');
        $(".title").html("Untitled *");
    }
    catch(e) { 
        console.log('Failed to create new file !'); 
        //console.log(e);
    }

}


module.exports = openFile;