/*jshint asi:true */
'use strict';

var fs = require('fs')
  , path = require('path')
  , highlight = require('..').highlight
  , colorize = require('../colorize')
  , diffFile = path.join(__dirname, 'fixtures', 'git-diff.txt') 
  , diff = fs.readFileSync(diffFile, 'utf-8')


// @@ is not a valid js token, so when we see it, we can be sure that we are dealing with a git or svn diff
var diffRegex = /^@@[^@]+@@$/m;
var diffIndRegex = /^(@@[^@]+@@)(.*)$/;
var lines = diff.split('\n');

function isDiff(lines) {
  return !!lines
    .filter(function (line) { 
      return diffRegex.test(line); 
    })
    .length;
}
var diff = isDiff(lines);
function tryHighlight(code) {
  try {
    return highlight(code);
  } catch (e) {
    return code; 
  }
}

function highlightDiff(line) {
  var matches = diffIndRegex.exec(line)
    , highlightedDiffInd = colorize.brightBlue(matches[1])
    , code = matches[2];

  return code ? highlightedDiffInd + tryHighlight(code) : highlightedDiffInd;
}

console.log(
  highlightDiff('@@ -25,22 +31,47 @@ function resolveTheme (config) { }')
)

var highlightedLines = lines
  .map(function (line) {
    var code = diff ? line.slice(1) : code
      , highlighted;
    try {
      highlighted = highlight(code);
    } catch (e) {
      highlighted = code;
    }
    return diff ? colorize.yellow(line[0]) + highlighted : highlighted;
  });

//console.log(highlightedLines.join('\n'));

