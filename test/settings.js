'use strict';
/*jshint asi: true*/

var test     =  require('tap').test
  , path     =  require('path')
  , fs       =  require('fs')
  , settings =  require('../settings')
  , hideSemicolonsTheme =  require('../themes/hide-semicolons')
  , home                =  path.join(__dirname, 'fixtures', 'home')
  , rcpath              =  path.join(home, '.cardinalrc')

function writerc(config) {
  fs.writeFileSync(rcpath, JSON.stringify(config), 'utf-8')
}

function removerc () {
  fs.unlinkSync(rcpath)
}

function resolveTheme (config) {
  writerc(config)
  var result = settings.resolveTheme(home)
  removerc()
  return result;
}

if (!fs.exists(home)) fs.mkdir(home);

test('no .cardinalrc in home', function (t) {
  var theme = settings.resolveTheme(home)
  t.equals(theme, undefined, 'resolves no theme') 
  t.end()
})

test('.cardinalrc with theme "hide-semicolons" in home', function (t) {
  var theme = resolveTheme({ theme: "hide-semicolons" })
  t.deepEquals(theme, hideSemicolonsTheme, 'resolves hide-semicolons theme') 
  t.end()
})

test('.cardinalrc with full path to "hide-semicolons.js" in home', function (t) {
  var theme = resolveTheme({ theme: path.join(__dirname, '..', 'themes', 'hide-semicolons.js') })
  t.deepEquals(theme, hideSemicolonsTheme, 'resolves hide-semicolons theme') 
  t.end()
})
