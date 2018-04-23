'use strict';
/*jshint asi: true*/

// applying esprima to a bunch of files of contained libraries as a smoke test
var test     =  require('tap').test
  , path     =  require('path')
  , fs       =  require('fs')
  , readdirp =  require('readdirp')
  , cardinal  =  require('..')
  , node_modules =  path.join(__dirname, '..', 'node_modules')
  , tapdir       =  path.join(node_modules, 'tap')
  , redeyeddir   =  path.join(node_modules, 'redeyed')


test('tap', function (t) {
  readdirp({ root: tapdir, fileFilter: '*.js' })
    .on('data', function (entry) {
      
      var code = fs.readFileSync(entry.fullPath, 'utf-8')
        , result = cardinal.highlight(code);

      if (!(/^[^/*]*var /.test(code))) {
        t.pass('skipping ' + entry.path + ' due to missing var statement')
      } else {
        t.assert(~result.indexOf('[32mvar\u001b[39m'), 'highlighted ' + entry.path)
      }
    })
    .on('end', t.end.bind(t))
})

test('redeyed', function (t) {
  readdirp({ root: redeyeddir, fileFilter: 'redeyed.js' })
    .on('data', function (entry) {
      
      var code = fs.readFileSync(entry.fullPath, 'utf-8')
        , result = cardinal.highlight(code);

      t.assert(~result.indexOf('[32mvar\u001b[39m') || !(~result.indexOf('var ')), 'highlighted ' + entry.path)
    })
    .on('end', t.end.bind(t))
})
