const getFilterLogByIP = require('./utility');

const rightIP1 = '89.123.1.41';
const rightIP2 = '34.48.240.111';
const sourceFile = 'access.log';

getFilterLogByIP(rightIP1, sourceFile);
getFilterLogByIP(rightIP2, sourceFile);
