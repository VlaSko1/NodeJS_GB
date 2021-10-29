const colors = require('colors/safe');
const errorObj = require('./myModule/error');
const objSimpleNumber = require('./myModule/simpleNumber');
const objFormatResult = require('./myModule/formatResult');


const number1 = Number(process.argv[2]);
const number2 = Number(process.argv[3]);


if (Number.isNaN(number1) || Number.isNaN(number2)) {
  return errorObj.getError("notNaN");
}
if (number1 >= number2) {
  return errorObj.getError('oneMinTwo')
}


const result = objSimpleNumber.getArraySimpleNumFromRange(number1, number2);

objFormatResult.returnResult(result);

