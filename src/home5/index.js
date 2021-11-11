#!/usr/bin/env node
const http = require('http');
const fs = require('fs');

console.log("Server start 3001 port!");
const server = http.createServer((request, response) => {

  if (request.method === 'GET') {
    response.writeHead(200, {
      "Content-Type": 'text/html'
    });
    const readStream = fs.createReadStream('./src/home5/index.html', 'utf-8');
    readStream.pipe(response);
  }
  
}).listen(3001, 'localhost');