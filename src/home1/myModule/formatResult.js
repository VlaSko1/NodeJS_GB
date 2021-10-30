const colors = require('colors/safe');

const objFormatResult = {
  textOutputColors: ["green", "yellow", "red", ],
  returnResult(arr) {
    if (arr.length === 0 ) {
      return console.log(colors.red("В диапазоне нет простых чисел."));
    }
    for (let i = 0, j = 0; i < arr.length; i++, j++) {
      if (j >= this.textOutputColors.length) {
        j = 0; 
      }
      console.log(colors[this.textOutputColors[j]](arr[i]));
    }
  }
}

module.exports = objFormatResult;