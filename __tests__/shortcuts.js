
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
describe('Shortcut Tests', () => {
    
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        ta = new TextArea(".TextArea");
        sh = new Shortcuts(ta); 
        tr = ta.rows[ta.getTargetRow()];
    });

    test(' TextArea decreaseLevel exists', () => {          
        expect(ta.decreaseLevel).toBeDefined();
    });
    
    test('TextRow decreaseLevel exists', () => {          
        expect(tr.decreaseLevel).toBeDefined();
    });
    
    test('decreaseLevel decreases row level', () => {  
        ta.appendRow();   
        ta.appendRow();    
        ta.increaseLevel();
        expect(ta.rows[ta.getTargetRow()].getLevel()).toBe(1);
        ta.setTargetRow(ta.getTargetRow()-1);
        ta.increaseLevel();
        ta.setTargetRow(ta.getTargetRow()+1);
        expect(ta.rows[ta.getTargetRow()].getLevel()).toBe(2);        
        ta.decreaseLevel();
        expect(ta.rows[ta.getTargetRow()].getLevel()).toBe(1);
    });
});
