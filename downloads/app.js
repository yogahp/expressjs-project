'use strict'

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

var app = module.exports = express();

// path to where the files are stored on disk
var FILES_DIR = path.join(__dirname, 'public/files/')

app.get('/', function(req, res){
  res.send('<ul>' +
    '<li>Download <a href="/download/amazing.txt">amazing.txt</a>.</li>' +
    '<li>Download <a href="/download/missing.txt">missing.txt</a>.</li>' +
    '<li>Download <a href="/download/CCTV大赛上海分赛区.txt">CCTV大赛上海分赛区.txt</a>.</li>' +
    '</ul>')
});

// /files/* is accessed via req.params[0]
// but here we name it :file
app.get('/download/:filename', function(req, res, next){
  console.log("FILES_DIR + req.params.filename", FILES_DIR + req.params.filename)
  res.download(FILES_DIR + req.params.filename, function (err) {
    if (!err) return; // file sent
    if (err.status !== 404) return next(err); // non-404 error
    // file for download not found
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}