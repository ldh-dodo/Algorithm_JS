const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = [];
const countArr = Array(10).fill(0);
const maxSize = Math.min(N, M);

let filteredNum = new Set();

for (let i = 1; i < input.length; i++) {
  board.push(input[i].split("").map(Number));
}

board.forEach((rows) =>
  rows.forEach((num) => {
    countArr[num]++;
    if (countArr[num] >= 4) {
      filteredNum.add(num);
    }
  })
);

if (filteredNum.size === 0) console.log(1);
else {
  let flag = false;

  for (let size = maxSize; size >= 2; size--) {
    if (flag) break;
    for (let y = 0; y < N; y++) {
      if (flag) break;
      for (let x = 0; x < M; x++) {
        const num = board[y][x];

        if (!filteredNum.has(num)) continue;
        if (y + size - 1 >= N || x + size - 1 >= M) continue;

        if (
          num === board[y][x + size - 1] &&
          num === board[y + size - 1][x] &&
          num === board[y + size - 1][x + size - 1]
        ) {
          console.log(size * size);
          flag = true;
          break;
        }
      }
    }
  }

  if (!flag) console.log(1);
}
