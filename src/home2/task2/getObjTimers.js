const colors = require('colors/safe');

function getObjTimers(arrTimers) {
  const objTimers = [];
   
  arrTimers = arrTimers.map((el) => el.split('-'));
  
  const arrTimersSecond = arrTimers.map((el) => getSecondFromTimer(el));
  
  function getSecondFromTimer(arrTimer) {
    let [h = 0, d = 0, m = 0, y = 0] = [...arrTimer];
    
    return Math.round(3600 * (Number(h) + 24 * (Number(d) + 30 * Number(m)  + 365 * Number(y))));
  }
  
  for (let i = 0; i < arrTimersSecond.length; i++ ) {
    if (Number.isNaN(arrTimersSecond[i])) {
      console.log(colors.red(`${i + 1} таймер задан в формате отличном от "час-день-месяц-год" (вводить цифрами).`));
      continue;
    }
    objTimers.push({name: `Таймер ${i + 1}`, time: arrTimersSecond[i]});
  }

  return objTimers;
}


module.exports = getObjTimers; 