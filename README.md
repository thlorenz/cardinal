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
- `.cardinalrc` global config for cli
- supports UNIX pipes


