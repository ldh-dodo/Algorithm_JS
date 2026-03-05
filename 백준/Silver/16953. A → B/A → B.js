const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
let [A, B] = input[0].split(" ").map(Number);
let cnt = 1;

while (B > A) {
  if (B % 10 === 1) {
    B = Math.floor(B / 10);
  } else if (B % 2 === 0) {
    B /= 2;
  } else break;
  cnt++;
}

console.log(A === B ? cnt : -1);
