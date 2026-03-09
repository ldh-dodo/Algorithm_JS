const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const tails = [];

for (const el of arr) {
  let l = 0;
  let r = tails.length;

  while (l < r) {
    const mid = (l + r) >> 1;

    if (tails[mid] < el) l = mid + 1;
    else r = mid;
  }

  tails[l] = el;
}

console.log(tails.length);
