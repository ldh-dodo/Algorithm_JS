const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const num = input[1].split(" ").map(Number);
let answer = 0;

num.sort((a, b) => a - b);

for (let i = 0; i < N; i++) {
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

    const sum = num[l] + num[r];
    if (sum === num[i]) {
      answer++;
      break;
    }

    if (sum < num[i]) l++;
    else r--;
  }
}

console.log(answer);
