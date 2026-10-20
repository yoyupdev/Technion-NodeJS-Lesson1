const num = 237;

let isPrimary = true;

for (let i = 2; i < num; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      isPrimary = false;
      break;
    }
  }
  if (isPrimary) console.log(i);
  isPrimary = true;
}
