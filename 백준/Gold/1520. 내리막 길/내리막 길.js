const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [M, N] = input[0].split(" ").map(Number);
const board = [];

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let i = 1; i < input.length; i++) {
  board.push(input[i].split(" ").map(Number));
}

// dp 초기화. dp[y][x]: (y,x)까지 도달 가능한 경로 수

const dp = Array.from({ length: M }, () => Array.from({ length: N }, () => null));
dp[0][0] = 1;

dfs(M - 1, N - 1);

function dfs(y, x) {
  if (dp[y][x] !== null) return dp[y][x];

  dp[y][x] = 0;

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue;
    if (board[ny][nx] <= board[y][x]) continue;

    dp[y][x] += dfs(ny, nx);
  }

  return dp[y][x];
}

console.log(dp[M - 1][N - 1]);
