// Creates a graph from the input text lines
var textLine = require("./textLine");

class Graph{
    constructor(){
        this.line = null;
        this.children = [];
        this.parent = null;
    }

    setParent(parent){
        this.parent = parent;
    }

    setLine(line){
        this.line = line;
    }

    getPrependix(){
        if(this.line != null){
            return this.line.getPrependix();
        } else {
            return "";
        }
    }

    getParent(){
        return this.parent;
    }

    addChild(child){
        this.children.push(child);
    }
}

module.exports = class textGraph {
    constructor(textContent){
        this.textContent = textContent;
        this.graph = new Graph();
    }

    getGraph(){
        return this.graph;
    }

    buildGraph(){
        var lines = this.textContent.getContentLines();
        var currentGraph = this.graph;
        for(var i = 0; i < lines.length; i++){
            // Build graph
            // TODO: verify this does not leak memory
            var line = new textLine(lines[i]);

            var graph = new Graph();
            graph.setLine(line);
            console.log(line.getPrependix());

            // While we balieve the `next line`(graph.getPrependix()) is at a higher hirarchy then
            // the `current line`(currentGraph.getPrependix()) move up the hirarchy until we are
            // at a higher or at the top of the hirarchy.
            while(currentGraph.getPrependix().length >= graph.getPrependix().length){
                var parent = currentGraph.getParent();
                if(parent != null){
                    currentGraph = parent;
                } else {
                    break;
                }
            }
            
            // Add the next line to as a child to the current line 
            // (`currentGraph` should be its parent)
            graph.setParent(currentGraph);
            currentGraph.addChild(graph);
            currentGraph = graph;
        }
    }
}