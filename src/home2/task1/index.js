console.log('Record 1');

setTimeout(() => {
  console.log('Record 2');
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log('Record 3');
      Promise.resolve().then(() => {
        console.log('Record 4');
      });
    });
  });
});

console.log('Record 5');

Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));



// Мой вариант: 1, 5, 6, 2, 3, 4

setTimeout(() => {
  console.log("Развернутый ответ к первой задаче в текстовом виде находится в файле: ./src/home2/task1/explanation.txt")
}, 200);