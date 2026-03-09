const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
let answer = [];
let min = Infinity;

arr.sort((a, b) => a - b);

for (let i = 0; i < N; i++) {
  // i 용액 포함, l, r 포함

  let l = 0;
  let r = N - 1;

  while (l < r) {
    if (l === i) {
      l++;
      continue;
    }

    if (r === i) {
      r--;
      continue;
    }

    const sum = arr[i] + arr[l] + arr[r];

    if (Math.abs(sum) < min) {
      min = Math.abs(sum);
      answer = [arr[i], arr[l], arr[r]];
    }

    if (sum > 0) r--;
    else l++;
  }
}

console.log(answer.sort((a, b) => a - b).join(" "));
