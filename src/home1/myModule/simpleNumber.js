const objSimpleNumber = {
  simpleNumber: [],
  simpleNumberFromRange: [],

  compareTwoNum(minLimit, num) {
    if (minLimit <= num) {
      this.simpleNumberFromRange = [...this.simpleNumberFromRange, num];
    }
  },

  checkSimple(num) {
    for (let i = 0; i < this.simpleNumber.length; i++) {
      if (num % this.simpleNumber[i] === 0) {
        return false;
      }
    }
    return true;
  },
  getArraySimpleNumFromRange(x, y) {
    
    if (y < 2) {
      return this.simpleNumberFromRange;
    } 

    for (let i = 2; i <= y; i++) {
      if (i === 2) {
        
        this.simpleNumber = [...this.simpleNumber, i];
        this.compareTwoNum(x, i); 
        continue;
      }
      if (this.checkSimple(i)) {
        this.simpleNumber = [...this.simpleNumber, i];
        this.compareTwoNum(x, i);
      }
    }
    return this.simpleNumberFromRange;
  } 
}

module.exports = objSimpleNumber;