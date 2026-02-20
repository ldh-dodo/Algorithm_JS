const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
let board = [];

for (let i = 1; i < input.length; i++) {
  board.push(input[i].split(" ").map(Number));
}

let copy = board.map((row) => [...row]);
let answer = 0;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

/**
 * 1년 진행 -> 0제외한 연결 요소 2 이상 확인 -> 반복
 */

let year = 0;
while (1) {
  year++;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      let cnt = 0;

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (!validCoord(ny, nx)) continue;
        if (board[ny][nx] === 0) cnt++;
      }

      copy[y][x] -= cnt;
      if (copy[y][x] < 0) copy[y][x] = 0;
    }
  }
  board = copy.map((row) => [...row]);
  bfs(year);

  if (answer !== 0) break;
  if (board.every((row) => row.every((v) => v === 0))) break;
}

console.log(answer);

function validCoord(y, x) {
  return y >= 0 && y < N && x >= 0 && x < M;
}

function bfs(year) {
  let cnt = 0;
  let visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
  let queue = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 0) continue;
      if (visited[y][x]) continue;

      cnt++;
      let head = 0;
      visited[y][x] = true;
      queue.push([y, x]);

      while (head < queue.length) {
        const [cy, cx] = queue[head++];

        for (let dir = 0; dir < 4; dir++) {
          const ny = cy + dy[dir];
          const nx = cx + dx[dir];

          if (!validCoord(ny, nx) || visited[ny][nx]) continue;
          if (board[ny][nx] === 0) continue;

          visited[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  }

  if (cnt === 0) {
    answer = 0;
  } else if (cnt >= 2) {
    answer = year;
  }
}
