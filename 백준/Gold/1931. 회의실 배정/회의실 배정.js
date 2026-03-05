const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const info = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // [ [startTime, endTime], ... ]

info.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

let [prevSt, prevEnd] = info[0];
let cnt = 1;

for (let i = 1; i < info.length; i++) {
  const [st, end] = info[i];

  if (st < prevEnd) continue;
  prevEnd = end;
  cnt++;
}

console.log(cnt);
