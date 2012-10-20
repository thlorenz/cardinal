var redeyed =  require('redeyed')
  , theme   =  require('./themes/default')
  , fs      =  require('fs')
  , util    =  require('util')
  ;

function isFunction (obj) {
  return toString.call(obj) == '[object Function]';
}

function highlight (code, theme_) {
  try {
    return redeyed(code, theme_ || theme);
  } catch (e) {
    e.message = 'Unable to perform highlight. The code contained syntax errors: ' + e.message;
    throw e;
  }
}

function highlightFile (fullPath, theme_, cb) {
  if (isFunction(theme_)) { 
    cb = theme_;
    theme_ = theme;
  }

  fs.readFile(fullPath, 'utf-8', function (err, code) {
    if (err) return cb(err);
    try {
      cb(null, highlight(code, theme_));
    } catch (e) {
      cb(e);
    }
  });
}

function highlightFileSync (fullPath, theme_) {
  var code = fs.readFileSync(fullPath, 'utf-8');
  return highlight(code, theme_);
}

module.exports = {
    highlight         :  highlight
  , highlightFile     :  highlightFile
  , highlightFileSync :  highlightFileSync
};

if (module.parent) return;

highlightFile(__filename, require('./themes/no-semicolons'), function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});




