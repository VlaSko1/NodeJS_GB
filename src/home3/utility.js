const fs = require('fs');
const path = require("path");
const { EOL } = require('os');
const { Transform } = require('stream');
const colors = require('colors/safe');


const getFilterLogByIP = (IP, sourceFile) => {
  // Используя замыкание, сохраняю айпишник для вывода его в консоль после завершения работы потоков.
  function saveIp(ip) {
    let IP = ip;
    return () => IP;
  }
  const getIP = saveIp(IP);


  const readStream = fs.createReadStream(path.join(__dirname, sourceFile), 'utf-8');
  const writeStream = fs.createWriteStream(path.join(__dirname, `%${IP}%_requests.log`), { flag: 'a' });

  let incompletePieceStr = '';

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      chunk = incompletePieceStr + chunk;
      incompletePieceStr = '';
      // Разбиваем чанк на массив
      let arrMatch = chunk.toString().match(/\d{1,3}\.\d{1,3}.\d{1,3}.\d{1,3}(.*?)\n/g);
      // Находим последнюю битую часть чанка и сохраняем ее
      let lastFindElem = arrMatch.length - 1;
      let indIncompletePiece = chunk.lastIndexOf(arrMatch[lastFindElem]) + arrMatch[lastFindElem].length;
      incompletePieceStr = chunk.slice(indIncompletePiece);

      // Фильтруем массив строк с IP адресами и выбираем только нужные нам значения, убираем перенос строки Linux и 
      // подставляем корректный перенос для текущей ОС.
      const rightArr = arrMatch.filter((el) => el.includes(IP));
      const rightArrMod = rightArr.map((el) => el.slice(0, -1))
      let resultString = rightArrMod.join(`${EOL}`) + `${EOL}`;

      this.push(resultString);

      callback();
    }
  });

  readStream.pipe(transformStream).pipe(writeStream);
  
  readStream.on('error', (err) => console.log(err));

  writeStream.on('error', (err) => console.log(err));

  transformStream.on('error', (err) => console.log(err));

  transformStream.on('end', () => console.log(colors.green(`Логи с IP адресом ${getIP()} записаны в отдельный файл %${getIP()}%_requests.log`)));

}

module.exports = getFilterLogByIP;