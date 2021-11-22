const fs = require('fs');
const { workerData, parentPort } = require('worker_threads');
const { EOL } = require('os');

let { filepath, pattern } = workerData;

const readStream = fs.createReadStream(filepath, 'utf8');

readStream.on('data', (data) => getPatternByData(data));

function getPatternByData(data) {
    let arrMatch = data.toString().match(/^(.*?)$/gm);
    const rightArr = arrMatch.filter((el) => el.includes(pattern));
    let resultString = rightArr.join(`${EOL}`);
    parentPort.postMessage({ result: resultString })
}