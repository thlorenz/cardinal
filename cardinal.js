var redeyed =  require('redeyed')
  , theme   =  require('./themes/default')
  , fs      =  require('fs')
  , util    =  require('util')
  , colors  =  require('./colors')
  , colorSurround = colors.brightBlack.split(':')
  ;

function isFunction (obj) {
  return toString.call(obj) == '[object Function]';
}

function addLinenos (highlightedCode, firstline) {
  var highlightedLines = highlightedCode.split('\n');

  trimEmptyLines(highlightedLines);

  var linesLen = highlightedLines.length
    , lines = []
    , totalDigits
    , lineno
    ;

  function getDigits (n) {
    if (n < 10) return 1;
    if (n < 100) return 2;
    if (n < 1000) return 3;
    if (n < 10000) return 4;
    // this works for up to 99,999 lines - any questions?
    return 5;
  }

  function pad (n, totalDigits) {
    // not pretty, but simple and should perform quite well
    var padDigits= totalDigits - getDigits(n);
    switch(padDigits) {
      case 0: return '' + n;
      case 1: return ' ' + n;
      case 2: return '  ' + n;
      case 3: return '   ' + n;
      case 4: return '    ' + n;
      case 5: return '     ' + n;
    }
  }

  totalDigits = getDigits(linesLen + firstline - 1);

  for (var i = 0; i < linesLen; i++) {
    lineno = [ 
        colorSurround[0]
      , pad(i + firstline, totalDigits)
      , ': '
      , colorSurround[1] 
      ].join('');

    lines.push(lineno + highlightedLines[i]);
  }

  return lines.join('\n');
}

function trimEmptyLines(lines) {

  // remove lines from the end until we find a non-empy one
  var line = lines.pop();
  while(!line || !line.length)
    line = lines.pop();

  // put the non-empty line back
  if (line) lines.push(line);
}

function highlight (code, opts) {
  opts = opts || { };
  try {

    var result = redeyed(code, opts.theme || theme)
      , firstline = opts.firstline && !isNaN(opts.firstline) ? opts.firstline : 1;

    return opts.linenos ? addLinenos(result.code, firstline) : result.code;
  } catch (e) {
    e.message = 'Unable to perform highlight. The code contained syntax errors: ' + e.message;
    throw e;
  }
}

function highlightFile (fullPath, opts, cb) {
  if (isFunction(opts)) { 
    cb = opts;
  }

  fs.readFile(fullPath, 'utf-8', function (err, code) {
    if (err) return cb(err);
    try {
      cb(null, highlight(code, opts));
    } catch (e) {
      cb(e);
    }
  });
}

function highlightFileSync (fullPath, opts) {
  var code = fs.readFileSync(fullPath, 'utf-8');
  return highlight(code, opts);
}

module.exports = {
    highlight         :  highlight
  , highlightFile     :  highlightFile
  , highlightFileSync :  highlightFileSync
};

if (module.parent) return;

highlightFile(__filename, { linenos: true, firstline: 80 }, function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
