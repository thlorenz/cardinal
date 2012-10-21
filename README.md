# cardinal [![Build Status](https://secure.travis-ci.org/thlorenz/cardinal.png)](http://travis-ci.org/thlorenz/cardinal)

**car·di·nal** *(kärdn-l, kärdnl)* - A North American finch (Cardinalis cardinalis) having a crested head, a short thick
bill, and bright red plumage

**example.js:**

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

Syntax highlights your code with ANSI colors to be printed to the terminal.

## Features

- custom color [themes](https://github.com/thlorenz/cardinal/tree/master/themes)
- use it as a library or from the command line
- `.cardinalrc` config
- supports UNIX pipes

## Installation

### As library

    npm install cardinal

### As Commandline Tool

    [sudo] npm install -g cardinal

## Commandline

### Highlight a file

    cardinal file.js

### As part of a UNIX pipe

    `cat file.js | grep console | cardinal`

**Note:**

Not all code snippets may be parsable JavaScript. In these cases the snippet is printed to the terminal without
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

`theme` can be the name of any of the [build in themes](https://github.com/thlorenz/cardinal/tree/master/themes) or the
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
