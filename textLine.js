
var treeSymbols = ["└","─", "│","├", " "];		// determine how to draw the tree view

module.exports = class textLine {
    constructor(line){
        this.line = line;
    }
    
    // Gets the prependix
    getPrependix(){
        var index = 0;
        var prependix = "";
        while(treeSymbols.indexOf(this.line[index]) != -1){
            //console.log("Prependix: " + this.line[index] + " index: " + index);
            prependix += this.line[index];
            index++;
        }
        return prependix;
    }

    getText(){
        var index = 0;
        var text = "";
        while(treeSymbols.indexOf(this.line[index]) != -1){
            index++;
        }
        text = this.line.substring(index, this.line.length);
        return text;
    }
}