# cardinal [![Build Status](https://secure.travis-ci.org/thlorenz/cardinal.png)](http://travis-ci.org/thlorenz/cardinal)

**car·di·nal** *(kärdn-l, kärdnl)* - A North American finch (Cardinalis cardinalis) having a crested head, a short thick
bill, and bright red plumage

```javascript
var cardinal = require('cardinal');

function highlight () {
  cardinal.highlightFile(__filename, function (err, res) {
    if (err) return console.error(err);
    console.log(res);
  });
}

highlight();
```

![screenshot](https://github.com/thlorenz/cardinal/raw/master/assets/screen-shot.png)

## Features

- highlights JavaScript code with ANSI colors to improve terminal output
- theming support, see [custom color themes](https://github.com/thlorenz/cardinal/tree/master/themes)
- API and command line interface
- `.cardinalrc` config to customize settings
- supports UNIX pipes

***

**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Installation](#installation)
  - [As library](#as-library)
  - [As Commandline Tool](#as-commandline-tool)
- [Commandline](#commandline)
  - [Highlight a file](#highlight-a-file)
  - [As part of a UNIX pipe](#as-part-of-a-unix-pipe)
  - [Theme](#theme)
- [API](#api)
  - [highlight(code[, theme])](#highlightcode-theme)
  - [highlightFileSync(fullPath[, theme])](#highlightfilesyncfullpath-theme)
  - [highlightFile(fullPath[, theme], callback)](#highlightfilefullpath-theme-callback)
- [Examples](#examples)

## Installation

### As library

    npm install cardinal

### As Commandline Tool

    [sudo] npm install -g cardinal

## Commandline

### Highlight a file

    cardinal file.js

### As part of a UNIX pipe

    cat file.js | grep console | cardinal

**Note:**

Not all code lines may be parsable JavaScript. In these cases the line is printed to the terminal without
highlighting it.

### Theme

The default theme will be used for highlighting.

To use a different theme, include a `.cardinalrc` file in your `HOME` directory.

This is a JSON file of the following form:

```json
{
  "theme": "hide-semicolons"
}
```

`theme` can be the name of any of the [built-in themes](https://github.com/thlorenz/cardinal/tree/master/themes) or the
full path to a custom theme anywhere on your computer.

## API

### *highlight(code[, theme])*

- returns the highlighted version of the passed code ({String}) or throws an error if it was not able to parse it
- `theme` ({Object}) can be used optionally override the theme used to highlight

### *highlightFileSync(fullPath[, theme])*

- returns the highlighted version of the file whose fullPath ({String}) was passed or throws an error if it was not able
  to parse it
- `theme` ({Object}) can be used optionally override the theme used to highlight

### *highlightFile(fullPath[, theme], callback)*

- calls back with the highlighted version of the file whose fullPath ({String}) was passed or with an error if it was not able
  to parse it
- `theme` ({Object}) can be used optionally override the theme used to highlight
- `callback` ({Function}) has the following signature: `function (err, highlighted) { .. }`

## Examples ([*browse*](https://github.com/thlorenz/cardinal/tree/master/examples))

- [sample .cardinalrc](https://github.com/thlorenz/cardinal/blob/master/examples/.cardinalrc)
- [highlighting a code snippet](https://github.com/thlorenz/cardinal/blob/master/examples/highlight-string.js) via
  ***highlight()***
- [file that highlights itself](https://github.com/thlorenz/cardinal/blob/master/examples/highlight-self.js) via
  ***highlightFile()***
- [file that highlights itself hiding all
  semicolons](https://github.com/thlorenz/cardinal/blob/master/examples/highlight-self-hide-semicolons.js) via
  ***highlightFileSync()***


