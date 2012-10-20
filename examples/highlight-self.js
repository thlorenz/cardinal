// This file will highlight itself using the custom theme when run via: "node highlight-self"

var cardinal = require('..');

function highlight () {
  
  // Using the asynchronous highlightFile()
  // For synchronous highlighting use: highlightFileSync() - see highlight-self-hide-semicolons.js
  
  cardinal.highlightFile(__filename, function (err, res) {
    console.log(res);
  });
}

highlight();
