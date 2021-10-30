const colors = require('colors/safe');

const emiterEventTimer = (eventsEmiter, arrayTimers, ind) => {
  setTimeout(() => {
    eventsEmiter.emit(arrayTimers[ind].name, {arrayTimers, ind, eventsEmiter });
  }, 1000);
}

const nextSecondTimer = ({arrayTimers, ind, eventsEmiter }) => {
  let time = --arrayTimers[ind].time; 
  if (time === 0) {
    eventsEmiter.removeListener(arrayTimers[ind].name, nextSecondTimer);
    console.log(colors.green(`${arrayTimers[ind].name} завершён!`));
  } else {
    console.log(colors.yellow(`${arrayTimers[ind].name}: ${time} сек. осталось`));
    emiterEventTimer(eventsEmiter, arrayTimers, ind);
  }
}

module.exports = { emiterEventTimer, nextSecondTimer };