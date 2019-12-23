class History{
    constructor(){
        this.history = [];
    }
    record(event){
        this.history.push(event);
    }
}