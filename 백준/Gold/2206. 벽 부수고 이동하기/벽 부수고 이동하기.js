const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((line) => line.split("").map(Number));

let answer = -1;

// 0 : 이동 가능 1 : 벽
// (1, 1) (N, M) => (0, 0) (N -1, M -1)
// 기존 bfs에다가 벽을 부쉈는지 안부쉈는지에 대한 상태를 저장하자

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const q = [[0, 0, false, 1]]; // [y, x, broken: true, false, dist]
const visited = Array.from(
  { length: N },
  () => Array.from({ length: M }, () => Array.from({ length: 2 }, () => false)) // visited[y][x][0] : 벽 안부순 상태 visited[y][x][1] : 벽 부순상태
);
visited[0][0][0] = true;
visited[0][0][1] = true;

let head = 0;

while (head < q.length) {
  const [y, x, broken, dist] = q[head++];

  if (y === N - 1 && x === M - 1) {
    answer = dist;
    break;
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

    if (broken) {
      if (board[ny][nx] === 0 && !visited[ny][nx][1]) {
        visited[ny][nx][1] = true;
        q.push([ny, nx, true, dist + 1]);
      }
    } else {
      if (board[ny][nx] === 0 && !visited[ny][nx][0]) {
        visited[ny][nx][0] = true;
        q.push([ny, nx, false, dist + 1]);
      } else if (board[ny][nx] === 1 && !visited[ny][nx][1]) {
        visited[ny][nx][0] = true;
        q.push([ny, nx, true, dist + 1]);
      }
    }

    // 현재까지 벽 부쉈을 때 선택지 : 1. 다음이 not 벽 그냥 이동
    // 현재까지 벽 안부쉈을 때 선택지 : 1. 다음이 벽 and 벽 부수고 이동 2. 다음이 not 벽 그냥 이동
  }
}

console.log(answer);
