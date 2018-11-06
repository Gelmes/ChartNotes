

var app = require('electron').remote; 
var Block = require('./block.js')

const b = new Block("blash","blush", "canvas");

var dialog = app.dialog;
var fs = require('fs');
dialog.showOpenDialog((fileNames) => {
    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
        console.log("No file selected");
        return;
    }

    fs.readFile('./file.txt', 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
        console.log("The file content is : " + data);
        var code = data.split("```")[1];
        console.log(code);
        var line = code.split("\n");
        console.log("==============");
        for (var i = 1; i < line.length-1; i++){
            var hiarchy = line[i].split(" ",1)[0];
            console.log(hiarchy);
            var whiteBoard = document.getElementById("whiteBoard");
            whiteBoard.innerHTML += hiarchy + "<br>";
        }
    });
});
 

// // Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
// // And obviously , loop through the fileNames and read every file manually
// dialog.showOpenDialog({ 
//     properties: [ 
//         'openFile', 'multiSelections', (fileNames) => {
//             console.log(fileNames);
//         }
//     ]
// });