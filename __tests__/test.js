
// Taken from: https://dev.to/snowleo208/things-i-learned-after-writing-tests-for-js-and-html-page-4lja
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest.dontMock('fs');

const TextArea = require("../js/textarea.js")
const TextRow = require("../js/textrow.js")
const Shortcuts = require("../js/shortcuts.js")
var $ = require("jquery");

// This test must run before other test for now to set up the TextArea object
describe('Test Row Creation', () => {
    
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        ta = new TextArea(".TextArea");
        sh = new Shortcuts(ta);    
        tr = ta.rows[ta.getTargetRow()];  // Should be targeting the second row
    });

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
    
    test('set out of range row', () => {        
        ta.setTargetRow(0);
        expect(ta.getTargetRow()).toBe(0);
        ta.setTargetRow(1);
        expect(ta.getTargetRow()).toBe(0);
    });
    
    test('row assignment', () => {      
        ta.appendRow();
        ta.appendRow();
        ta.appendRow();  
        ta.setTargetRow(0);
        expect(ta.getTargetRow()).toBe(0);
        ta.setTargetRow(1);
        expect(ta.getTargetRow()).toBe(1);
        ta.setTargetRow(2);
        expect(ta.getTargetRow()).toBe(2);
    });
});
function simulateKeyPress(character) {
    $.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
  }

describe('TAB Shortcut', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        ta = new TextArea(".TextArea");
        sh = new Shortcuts(ta);    
        ta.appendRow();                       // Adds the row we will be working with
        tr = ta.rows[ta.getTargetRow()];  // Should be targeting the second row
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });


    test('Rows have hirarchy', () => {
        expect(tr.level).toBeDefined();
    });

    test('Shortcut increments hirarchy', () => {
        ta.increaseLevel();
        expect(ta.rows.length).toBe(2);
        expect(ta.getTargetRow()).toBe(1);
        expect(tr.index).toBe(1);
        expect(tr.level).toBe(1);
    });

    test('hirarchy does not surpass row above', () =>{
        ta.increaseLevel();
        expect(ta.rows.length).toBe(2);
        expect(ta.getTargetRow()).toBe(1);
        expect(tr.index).toBe(1);
        expect(tr.level).toBe(1);
    });

    test('TextRow have addTab function', () =>{
        expect(tr.addTab).toBeDefined();
    });

    // Adding tab no longer insert elemnts but instead modifies the padding-left property
    // test('addTab inserts div element into row', () =>{
    //     expect(tr.content.children().length).toBe(0);
    //     tr.addTab();
    //     expect(tr.content.children().length).toBe(1);
    //     tr.addTab();
    //     expect(tr.content.children().length).toBe(2);
    // });

    // test('Increasing row level adds a tab to current row', () =>{
    //     expect(tr.content.children().length).toBe(0);
    //     tr.increaseLevel();
    //     expect(tr.content.children().length).toBe(1);
    //     tr.increaseLevel();
    //     expect(tr.content.children().length).toBe(2);
    // });

    // test('Increasing texArea adds tab to current row', () =>{
    //     expect(tr.content.children().length).toBe(0);
    //     ta.increaseLevel();
    //     expect(tr.content.children().length).toBe(1);
    //     ta.increaseLevel();
    //     expect(tr.content.children().length).toBe(1); // Level does not surpass that of previous row
    // });
    
    // test('Increases the level of rows below', () =>{
    //     // Create a new row and increase level
    //     ta.appendRow();                   
    //     ta.increaseLevel();
    //     tr = ta.rows[ta.getTargetRow()];
    //     expect(tr.content.children().length).toBe(1);

    //     // Go up a row and increase its level
    //     ta.setTargetRow(1);
    //     ta.increaseLevel();
    //     tr = ta.rows[ta.getTargetRow()];
    //     expect(tr.content.children().length).toBe(1);

    //     // Go back down a row and see if its level increased
    //     ta.setTargetRow(2);
    //     tr = ta.rows[ta.getTargetRow()];
    //     expect(tr.content.children().length).toBe(2);
    // });
    
    test('New line makes row at current level', () =>{
        // Create a new row and increase level
        ta.appendRow();                   
        ta.increaseLevel();
        

        // Go up a row and increase its level
        ta.setTargetRow(1);
        ta.increaseLevel();

        

        // Go back down a row and see if its level increased
        ta.setTargetRow(2);
        ta.appendRow();
        expect(ta.rows[ta.getTargetRow()].getLevel()).toBe(ta.rows[ta.getTargetRow()-1].getLevel());
    });


});
