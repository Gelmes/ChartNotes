
  
const TextArea = require("../js/textarea.js")
const TextRow = require("../js/textrow.js")
const Shortcuts = require("../js/shortcuts.js")
var $ = require("jquery");

  
let ta = new TextArea(".TextArea");
let sh = new Shortcuts(ta);    
let tr = ta.rows[0];

// This test must run before other test for now to set up the TextArea object
describe('Test Row Creation', () => {    
    test('Create Rows', () => {
        expect(ta.rows.length).toBe(1);
        expect(ta.getTargetRow()).toBe(0);
        ta.appendRow();
        expect(ta.rows.length).toBe(2);
        expect(ta.getTargetRow()).toBe(1);
        ta.appendRow();
        expect(ta.rows.length).toBe(3);
        expect(ta.getTargetRow()).toBe(2);
    });
    
    test('row assignment', () => {        
        ta.setTargetRow(0);
        expect(ta.getTargetRow()).toBe(0);
        ta.setTargetRow(1);
        expect(ta.getTargetRow()).toBe(1);
        ta.setTargetRow(2);
        expect(ta.getTargetRow()).toBe(2);
    });
});


describe('TAB Shortcut', () => {
    beforeEach(() => {
        ta = new TextArea(".TextArea");   // This is our main object
        sh = new Shortcuts(ta);           // Creates the shortcuts object
        ta.appendRow();                       // Adds the row we will be working with
        tr = ta.rows[ta.getTargetRow()];  // Should be targeting the second row
    });

    test('Rows have hirarchy', () => {
        expect(tr.level).toBeDefined();
    });

    test('TAB Shortcut Exists', () => {
        expect(sh.handleTab).toBeDefined();
    });

    test('Shortcut increments hirarchy', () => {
        sh.handleTab();
        expect(ta.rows.length).toBe(2);
        expect(ta.getTargetRow()).toBe(1);
        expect(tr.index).toBe(1);
        expect(tr.level).toBe(1);
    });

    test('hirarchy does not surpass row above', () =>{
        sh.handleTab();
        expect(ta.rows.length).toBe(2);
        expect(ta.getTargetRow()).toBe(1);
        expect(tr.index).toBe(1);
        expect(tr.level).toBe(1);
    });

    

});