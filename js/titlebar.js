const { BrowserWindow } = require('electron').remote;
var $ = require("jquery");

(function () {

    //var remote = require('remote'); 
    //var BrowserWindow = remote;

   function init() { 
        $("#min-btn").click( function (e) {
             var window = BrowserWindow.getFocusedWindow();
             window.minimize(); 
        });

        $("#max-btn").click( function (e) {
             var window = BrowserWindow.getFocusedWindow(); 
             window.maximize(); 
        });

        $("#close-btn").click( function (e) {
             var window = BrowserWindow.getFocusedWindow();
             window.close();
        }); 
   }; 

   document.onreadystatechange = function () {
        if (document.readyState == "complete") {
             init(); 
        }
   };

})();
