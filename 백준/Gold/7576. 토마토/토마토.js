const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [M, N] = input[0].split(" ").map(Number);

const board = input.slice(1, N + 1).map((line) => line.split(" ").map(Number)); // 0 : 익지 않은 토마토 1: 익은 토마토 -1 : 토마토가 들어있지 않은 칸
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
const q = [];

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1) {
      q.push([i, j, 0]); // [y, x, day]
      visited[i][j] = true;
    }
  }
}

let max = 0;
let head = 0;

while (head < q.length) {
  const [cy, cx, cost] = q[head++];

  for (let dir = 0; dir < 4; dir++) {
    const ny = cy + dy[dir];
    const nx = cx + dx[dir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
    if (visited[ny][nx]) continue;
    if (board[ny][nx] === -1) continue;

    visited[ny][nx] = true;
    q.push([ny, nx, cost + 1]);
    max = Math.max(max, cost + 1);
  }
}

const canAnswer = () => {
  let flag = true;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] !== -1 && !visited[i][j]) {
        flag = false;
        break;
      }
    }
  }

  return flag;
};

console.log(canAnswer() ? max : -1);
