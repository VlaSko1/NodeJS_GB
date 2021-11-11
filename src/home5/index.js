#!/usr/bin/env node
/*const http = require('http');
const fs = require('fs');
const path = require('path');*/
const {showFileContents, getPath, getFile, getPattern} = require('./utils');
const express = require('express');

const CWD = getPath();

const app = express();
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  const date = new Date();
  res.render('index', {nowYear: date.getFullYear()});
})
app.listen(3000, 'localhost', () => {
  
});
console.log("Server start 3000 port!");


/*const server = http.createServer((request, response) => {

  if (request.method === 'GET') {
    response.writeHead(200, {
      "Content-Type": 'text/html'
    });
    const readStream = fs.createReadStream('./src/home5/index.html', 'utf-8');
    readStream.pipe(response);
  }
  
}).listen(3001, 'localhost');*/