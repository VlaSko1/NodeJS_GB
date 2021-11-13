#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { getPath, getNameFolder, getFileAndFolderNamesInDirectory, isFile } = require('./utils');
const express = require('express');

let CWD = getPath();
let folder = getNameFolder(CWD);
let arrDir = getFileAndFolderNamesInDirectory(CWD);


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', (req, res, next) => {

  const date = new Date();

  res.render('index', {
    nowYear: date.getFullYear(),
    pathDir: CWD,
    folder,
    arrDir,
    textFile: null,
  });
  res.status(200).end();
});

app.post('/', (req, res, next) => {
  let name = req.body.name
  CWD = path.join(CWD, name);
  if (isFile(CWD)) {
    next();
  } else {
    folder = getNameFolder(CWD);
    arrDir = getFileAndFolderNamesInDirectory(CWD);
    const date = new Date();
    res.render('index', {
      nowYear: date.getFullYear(),
      pathDir: CWD,
      folder,
      arrDir,
      textFile: null,
    });
    res.status(200).end();
  }
}, (req, res, next) => {
  let pathFile = CWD;
  CWD = path.join(CWD, '..');
  folder = getNameFolder(CWD);
  arrDir = getFileAndFolderNamesInDirectory(CWD);
  const date = new Date();
  res.render('index', {
    nowYear: date.getFullYear(),
    pathDir: pathFile,
    folder,
    arrDir,
    textFile: fs.readFileSync(pathFile, 'utf8'),
  });
  res.status(200).end();
});

app.listen(3000, 'localhost', () => {
  console.log("Server localhost start 3000 port!");
});


