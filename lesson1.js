const num = 123;

const divByTwo = num % 2 == 0;
const divByThree = num % 3 == 0;
const divByFive = num % 5 == 0;

console.log((divByTwo || divByThree || divByFive) && 1);
console.log(
  ((divByTwo && divByThree) ||
    (divByTwo && divByFive) ||
    (divByThree && divByFive)) &&
    2,
);
console.log(divByTwo && divByThree && divByFive && 3);
