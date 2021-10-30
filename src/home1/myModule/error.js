const colors = require('colors/safe');

const errorObj = {
  oneMinTwo: "Первое число должно быть мешьне второго",
  notNaN: "Введите два параметра: положительные числа, первый параметр может быть равным 0.",
  getError(key) {
    if (this.hasOwnProperty(key) && typeof key !== "function") {
      console.log(colors.red("Error: " + this[key]));
    } else {
      console.log(colors.red("Error: " + "Ошибка неопределена"));
    }
  },
};

module.exports = errorObj;