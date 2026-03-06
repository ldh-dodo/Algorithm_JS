const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((line) => line.split(" ").map(Number));

// 빈 칸(0) 조합 찾고, 벽 세우고, bfs 돌리고, 0 개수 찾고 최댓 값 갱신
const combi = combination(board, 3);
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];
let max = 0;

for (let i = 0; i < combi.length; i++) {
  const t = [...combi[i]];
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));

  for (const [y, x] of t) {
    board[y][x] = 1;
  }

  const q = [];
  let head = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 2) {
        q.push([y, x]);
        visited[y][x] = true;
      } else if (board[y][x] === 1) visited[y][x] = true;
    }
  }

  while (head < q.length) {
    const [cy, cx] = q[head++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = cy + dy[dir];
      const nx = cx + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (visited[ny][nx]) continue;

      q.push([ny, nx]);
      visited[ny][nx] = true;
    }
  }

  const sum = visited.flat().reduce((acc, cur) => (cur === false ? acc + 1 : acc), 0);
  max = Math.max(max, sum);

  for (const [y, x] of t) {
    board[y][x] = 0;
  }
}

console.log(max);

function combination(arr, n) {
  const result = [];

  function dfs(path, startY, startX) {
    if (path.length === n) {
      result.push([...path]);
      return;
    }

    for (let y = startY; y < N; y++) {
      for (let x = y === startY ? startX : 0; x < M; x++) {
        if (board[y][x] !== 0) continue;

        path.push([y, x]);
        dfs(path, y, x + 1);
        path.pop();
      }
    }
  }

  dfs([], 0, 0);

  return result;
}
