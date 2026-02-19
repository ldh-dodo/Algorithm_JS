const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);
const arr = [];
const f = [];

for (let i = 1; i <= T; i++) {
  arr.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < arr.length; i++) {
  let [r, n] = arr[i];

  console.log(combination(n, r));
}

function combination(n, r) {
  r = Math.min(r, n - r);

  let result = 1;

  for (let i = 0; i < r; i++) {
    result *= n - i;
    result /= i + 1;
  }

  return result;
}
