#!/usr/bin/env node
var cardinal = require('..')
  , utl = require('../utl')
  , settings = require('../settings')
  , args = process.argv
  , theme = settings.resolveTheme()
  , highlighted
  ;

function highlightFile () {
  try {
    highlighted = cardinal.highlightFileSync(args[2], theme);
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
  , stdout = process.stdout;

stdin.resume();
stdin.setEncoding('utf-8');
stdin
  .on('data', function (chunk) {
    chunk.split('\n').forEach(function (line) {
      try {
        stdout.write(cardinal.highlight(line, theme) + '\n');
      } catch (e) {
        // line doesn't represent a valid js snippet and therefore cannot be parsed -> just print as is
        stdout.write(line + '\n');
      }
    });
  });

