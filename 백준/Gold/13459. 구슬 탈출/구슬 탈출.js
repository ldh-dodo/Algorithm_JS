const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

// board 세팅
const board = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));

let [ry, rx, by, bx] = Array.from({ length: 4 }, () => -1);

/**
 * . 빈칸
 * # 벽
 * O 구멍
 * R 빨간 구슬
 * B 파란 구슬
 *
 * 좌표 (0, 0) ~ (N - 1, M - 1)
 */

for (let i = 1; i < input.length; i++) {
  const row = input[i].split("");
  for (let j = 0; j < row.length; j++) {
    board[i - 1][j] = row[j];

    if (row[j] === "R") {
      ry = i - 1;
      rx = j;
      board[i - 1][j] = ".";
    } else if (row[j] === "B") {
      by = i - 1;
      bx = j;
      board[i - 1][j] = ".";
    }
  }
}

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array.from({ length: N }, () => Array.from({ length: M }, () => false)))
); // 4차원 visited[ry][rx][by][bx]

// 상 하 좌 우
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

// 파란 구슬을 구멍에 넣지 않으면서 빨간 구슬을 10번 이하로 움직여서 빼낼 수 있으면 1을 없으면 0을 출력한다.
let answer = 0;

const queue = [[ry, rx, by, bx, 0]];
visited[ry][rx][by][bx] = true;

let head = 0;

while (head < queue.length) {
  const [ry, rx, by, bx, depth] = queue[head++];

  if (depth >= 10) continue;

  for (let dir = 0; dir < 4; dir++) {
    let [nry, nrx, rCnt] = move(ry, rx, dir);
    let [nby, nbx, bCnt] = move(by, bx, dir);

    // 파란 구슬이 구멍에 빠졌는지 체크
    if (board[nby][nbx] === "O") continue;

    // 빨간 구슬이 구멍에 빠지면 성공
    if (board[nry][nrx] === "O") {
      answer = 1;
      break;
    }

    if (nry === nby && nrx === nbx) {
      // 위치가 같다면, 더 많이 이동한 구슬을 더 적게 이동한 구슬 한 칸 뒤로 이동
      if (rCnt > bCnt) {
        nry -= dy[dir];
        nrx -= dx[dir];
      } else if (bCnt > rCnt) {
        nby -= dy[dir];
        nbx -= dx[dir];
      }
    }

    // visited 체크가 되었다면 queue에 push X
    if (visited[nry][nrx][nby][nbx]) continue;

    // 둘 다 아니라면 visited 체크, queue push
    visited[nry][nrx][nby][nbx] = true;
    queue.push([nry, nrx, nby, nbx, depth + 1]);
  }

  if (answer === 1) break;
}

console.log(answer);

function move(y, x, dir) {
  let [ny, nx] = [y, x];
  let count = 0;

  while (true) {
    const ty = ny + dy[dir];
    const tx = nx + dx[dir];

    if (board[ty][tx] === "#") break;

    [ny, nx] = [ty, tx];
    count++;

    if (board[ny][nx] === "O") break;
  }

  return [ny, nx, count];
}
