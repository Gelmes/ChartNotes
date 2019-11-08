// Updates the file name based on file changes that need to be saved

WORKING_FILE = "";

function checkForFileChanges(){
    if(sh.keyPressed){
        sh.keyPressed = 0;
        if(WORKING_FILE != ""){
            $(".title").html(path.basename(WORKING_FILE) + " *");
        } else {
            $(".title").html("Untitled *");
        }
    }
}

function clearFileChanges(){
    $(".title").html(path.basename(WORKING_FILE) + " ");
}

setInterval(checkForFileChanges, 1000);