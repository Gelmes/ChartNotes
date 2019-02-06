# ChartNotes
A utility for creating simple notepad like notes that generate a chart to help you map out your thoughts.

##
* instead of doing complicated text manipulation I count the number of tabs to generate an internal tree

Parser vs Advance input manager
parser
  Simle, does not require advanced manipulation
Advance input manager
  Keyboard shortcuts to enter new data
  Quick way to edit types
  can add additional information on every line and hide it


## Outline
* Convert lines to html outlines
* Features
  * Enter - Creates a new line
  * alt down - moves line down
  * Vim features
    * esc - exit edit mode
    * i - enter edit mode
    * j - moves highlight down
    * k - moves highlight up
    * h - shrinks current list
    * l - expands current list
    * o - insert after
    * O - insert before
    * tab indent
    * shift tab dedent
    * z toggle collapse expand
    * ctrl z - undo
    * ctrl shift z - redo
    * return - edit mode (in normal mode)- new line (in edit mode)
  * Keep track of key history for undo and redo
* save to file (convert html to text)
* import file (text file)
* inline commands
  * datetime 
  * expected time
  * done (for burndown chart, stores final date)

## Sources
https://two-wrongs.com/draw-a-tree-structure-with-only-css
  
