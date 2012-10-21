#!/usr/bin/env node
var cardinal = require('..')
  , utl = require('../utl')
  , settings = require('../settings')
  , args = process.argv
  , highlighted
  ;

function highlightFile () {
  try {
    highlighted = cardinal.highlightFileSync(args[2]);
    console.log(highlighted);
  } catch (e) {
    console.trace();
    console.error(e);
  }
}

// E.g., "cardinal myfile.js"
if (args.length === 3) return highlightFile();

// UNIX pipes e.g., "cat myfile.js | grep console | cardinal
var stdin = process.stdin
  , buf = [];

stdin.resume();
stdin.setEncoding('utf-8');
stdin
  .on('data', function (chunk) {
    buf.push(chunk);
  })
  .on('end', function () {
    highlighted = cardinal.highlight(buf.join(''));
    console.log(highlighted);
  });

