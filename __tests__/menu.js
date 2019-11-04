const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest.dontMock('fs');

const TextArea = require("../js/textarea.js")
const TextRow = require("../js/textrow.js")
const Shortcuts = require("../js/shortcuts.js")
const menu = require("../js/menu.js")
var $ = require("jquery");

// This test must run before other test for now to set up the TextArea object
describe('Menu System', () => {
    
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        ta = new TextArea(".TextArea");
        sh = new Shortcuts(ta);    
    });

    test('menuOpen rests TextArea', () => {   
        ta.appendRow();
        expect(ta.rows.length).toBe(2);
        ta.reset();
        expect(ta.rows.length).toBe(1);
    });
});
