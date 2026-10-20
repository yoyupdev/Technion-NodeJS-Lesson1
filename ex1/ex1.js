const num = 150;

const divByTwo = num % 2 == 0;
const divByThree = num % 3 == 0;
const divByFive = num % 5 == 0;

console.log(Number(divByTwo) + Number(divByThree) + Number(divByFive));
