const fs = require('fs');
const { Transform } = require('stream');
const { workerData, parentPort } = require('worker_threads');
const { EOL } = require('os');

    let { filepath, pattern } = workerData;

    let data = fs.readFileSync(filepath, 'utf8');
    let arrMatch = data.toString().match(/^(.*?)$/gm);
    const rightArr = arrMatch.filter((el) => el.includes(pattern));
    let resultString = rightArr.join(`${EOL}`) + `${EOL}`;

    parentPort.postMessage({ result: resultString });

    
