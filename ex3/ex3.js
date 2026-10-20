// Kirill Pushkin + Yonatan Yuryev
const arr = [1, 2, 0, 5, 0, 8, 12, 0, 4];
let countZero = 0;
for (let i = 0; i < arr.length; i++) {
  arr[i] == 0 ? countZero++ : null;
}
