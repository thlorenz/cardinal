var path =  require('path')
  , util =  require('util')
  , fs   =  require('fs')
  , utl  =  require('./utl')
  , home =  process.env.HOME;

// home_ mainly to be used during tests
// Resolves the preferred theme from the .cardinalrc found in the HOME directory
// If it couldn't be resolved, undefined is returned
function resolveTheme (home_) {
  var settingsJson
    , settings
    , themePath;

  try {
    settingsJson = fs.readFileSync(path.join(home_ || home, '.cardinalrc'), 'utf-8');
  } catch (_) {
    // no .cardinalrc found - not a problem
    return undefined;
  }

  try {

    settings = JSON.parse(settingsJson);

    if (!settings.theme) return undefined;
    
    // allow specifying just the name of a built-in theme or a full path to a custom theme
    themePath = utl.isPath(settings.theme) ? settings.theme : path.join(__dirname, 'themes', settings.theme);

    return require(themePath);
  } catch (e) {
    // Have a .cardinalrc, but something about it is wrong - warn the user
    // Either we couldn't parse the contained JSON, or the specified theme path is invalid
    console.error(e);
    return undefined;
  }
}

module.exports = {
  resolveTheme: resolveTheme
};

