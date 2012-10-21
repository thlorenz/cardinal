# cardinal [![Build Status](https://secure.travis-ci.org/thlorenz/cardinal.png)](http://travis-ci.org/thlorenz/cardinal)

Syntax highlights your code with ANSI colors to be printed to the terminal.

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

**Output:**

![screenshot](https://github.com/thlorenz/cardinal/raw/master/assets/screen-shot.png)

