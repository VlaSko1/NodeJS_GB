const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { getPath, getNameFolder, getFileAndFolderNamesInDirectory, isFile } = require('./utils');
const express = require('express');

const PORT = 3000;
const HOST = '127.0.0.1';


let CWD = getPath();
let folder = getNameFolder(CWD);
let arrDir = getFileAndFolderNamesInDirectory(CWD);


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res, next) => {

  const date = new Date();

  res.render('index6', {
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
    res.render('index6', {
      nowYear: date.getFullYear(),
      pathDir: CWD,
      folder,
      arrDir,
      textFile: null,
    });
    res.status(200).end();
  }
}, async (req, res, next) => {
  let pathFile = CWD;
  CWD = path.join(CWD, '..');
  folder = getNameFolder(CWD);
  arrDir = getFileAndFolderNamesInDirectory(CWD);
  const date = new Date();
  res.render('index6', {
    nowYear: date.getFullYear(),
    pathDir: pathFile,
    folder,
    arrDir,
    textFile: fs.readFileSync(pathFile, 'utf8'),
  });
  res.status(201).end();
});


const server = app.listen(PORT, HOST, () => {  //Важно!!! Позволяет запустить в работу сервер на сокетах и http
  console.log("Server localhost start 3000 port!");
});

const io = require('socket.io')(server); //Важно!!! Позволяет запустить в работу сервер на сокетах и http
let connect = 0;

io.on('connection', function (socket) {
  
  socket.on('connect_user', () => {
    connect++;
    io.emit('SERVER_CONNECT', {connect});
        
  });
  socket.on('disconnect', () => {
    connect--;
    io.emit('SERVER_DISCONNECT', {connect})
  })

});