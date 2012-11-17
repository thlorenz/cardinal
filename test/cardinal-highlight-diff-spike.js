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
var addRemRegex = /^[+\-]/;
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

  function tryAppending(appended, tryNext) {
    var success;
    try {
       success = highlight(code + appended);
       return success;
    } catch (e) {
      return tryNext(code);
    }
  }

  function tryRemoveLeadingComma(tryNext) {
    var success;
    try {
       success = highlight(code.replace(/^( +),(.+)$/, '$1 $2'));
       return success;
    } catch (e) {
      return tryNext(code);
    }
  }

  function tryPlain() { return tryAppending('', tryCloseMustache); }

  function tryCloseMustache() { return tryAppending('}', tryCloseParen); }

  function tryCloseParen() { return tryAppending(')', tryCloseMustacheParen); }

  function tryCloseMustacheParen() { return tryAppending('})', tryRemovingCommas);}

  function tryRemovingCommas() { return tryRemoveLeadingComma(giveUp); }

  function giveUp() { return code; }

  return tryPlain();
}

function highlightDiffInd(line, matches) {
  var highlighted = colorize.brightBlue(matches[1])
    , code = matches[2];
  return code ? highlighted + tryHighlight(code) : highlighted;
}

function colorizeAddRemove(c) {
  return addRemRegex.test(c) ? colorize.yellow(c) : c;
}

function highlightDiff(line) {
  var diffIndMatches = diffIndRegex.exec(line);

  return diffIndMatches 
    ? highlightDiffInd(line, diffIndMatches)
    : colorizeAddRemove(line[0]) + tryHighlight(line.slice(1));
}

console.log(
  highlightDiff('@@ -25,22 +31,47 @@ function resolveTheme (config) { }')
)

var highlighter = diff ? highlightDiff : tryHighlight;
var highlightedLines = lines.map(highlighter);

console.log(highlightedLines.join('\n'));

