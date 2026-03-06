const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const board = input.slice(1, R + 1).map((line) => line.split(""));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];
let answer = 1;

dfs(0, 0, 1 << (board[0][0].charCodeAt(0) - 65), 1);

console.log(answer);

function dfs(y, x, visited, depth) {
  if (depth > answer) answer = depth;

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= R || nx >= C) continue;
    const bit = 1 << (board[ny][nx].charCodeAt(0) - 65);
    if (visited & bit) continue;

    dfs(ny, nx, visited | bit, depth + 1);
  }
}
