// This file sets the functions called by the title bar memnu system


const { BrowserWindow } = require('electron').remote;
var $ = require("jquery");

function menuClose(){
     var window = BrowserWindow.getFocusedWindow();
     window.close();
}

function menuMin(){
     var window = BrowserWindow.getFocusedWindow();
     window.minimize(); 
}

function menuMax(){
     var window = BrowserWindow.getFocusedWindow(); 
     window.maximize(); 
}

(function () {

    //var remote = require('remote'); 
    //var BrowserWindow = remote;

   $(".navbar-menu").load("./menu.html");

   function init() { 
        $(".menu-min").click( function (e) {
             menuMin();
        });

        $(".menu-max").click( function (e) {
             menuMax();
        });

        $(".menu-close").click( function (e) {
             menuClose();
        }); 
   }; 

   document.onreadystatechange = function () {
        if (document.readyState == "complete") {
             init(); 
        }
   };

})();
