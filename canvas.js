module.exports = class Canvas {
    constructor(name){
        alert("Creatign Canvas");
        this.canv = name;
        this.blocks = [];
    }

    draw (){
        for(var i = 0; i < this.blocks.length; i++){
            this.blocks.draw();
        }
    }

    addBlock(title, desc){
        const newBlock = new Block(title, desc, this.canv);
        this.blocks.push(newBlock);
    }
}