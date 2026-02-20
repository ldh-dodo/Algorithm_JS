const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);
const board = [];
let max = 1;

for (let i = 1; i < input.length; i++) {
  board.push(input[i].split(""));
}

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (x + 1 < N) {
      // 열 변경
      [board[y][x], board[y][x + 1]] = [board[y][x + 1], board[y][x]];

      max = Math.max(max, check());

      [board[y][x], board[y][x + 1]] = [board[y][x + 1], board[y][x]];
    }

    if (y + 1 < N) {
      // 행 변경

      [board[y][x], board[y + 1][x]] = [board[y + 1][x], board[y][x]];

      max = Math.max(max, check());

      [board[y][x], board[y + 1][x]] = [board[y + 1][x], board[y][x]];
    }
  }
}

console.log(max);

function check() {
  let max = 1;

  // row 검사
  for (let y = 0; y < N; y++) {
    let count = 1;
    for (let x = 0; x < N - 1; x++) {
      if (board[y][x] === board[y][x + 1]) count++;
      else count = 1;

      max = Math.max(count, max);
    }
  }

  // column 검사
  for (let x = 0; x < N; x++) {
    let count = 1;
    for (let y = 0; y < N - 1; y++) {
      if (board[y][x] === board[y + 1][x]) count++;
      else count = 1;

      max = Math.max(count, max);
    }
  }

  return max;
}
