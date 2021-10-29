const EventEmitter = require('events');
const colors = require('colors/safe');
const getObjTimers = require('./getObjTimers');
const { emiterEventTimer, nextSecondTimer } = require('./eventsUtility');

console.log("Описание работы программы смотрите в файле ./src/task2/manual.txt");

let arrTimers = process.argv.slice(2);
if (arrTimers.length === 0) {
  return console.log(colors.red("Параметры для создания таймеров не определены."));
}

const arrObjTimers = getObjTimers(arrTimers);
if (arrObjTimers.length === 0) {
  return console.log(colors.red("В программу были введены только некорректные таймеры, повторите попытку."));
}


class MyEventEmitter extends EventEmitter {
  constructor() {
      super();
  }
}

const timersEmitter = new MyEventEmitter();

for (let i = 0; i < arrObjTimers.length; i++) {
  timersEmitter.on(arrObjTimers[i].name, nextSecondTimer);
  emiterEventTimer(timersEmitter, arrObjTimers, i);
}
 




