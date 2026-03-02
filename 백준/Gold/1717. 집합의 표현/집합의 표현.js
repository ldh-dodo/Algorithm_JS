const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const p = Array(N + 1);
const rank = Array(N + 1);

for (let i = 0; i <= N; i++) makeSet(i);

for (let i = 0; i < M; i++) {
  let [op, u, v] = input[i + 1].split(" ").map(Number);

  if (op === 0) {
    unionSet(u, v);
  } else if (op === 1) {
    if (findSet(u) === findSet(v)) console.log("YES");
    else console.log("NO");
  }
}

function makeSet(u) {
  p[u] = u;
  rank[u] = 0;
}

function findSet(u) {
  if (u !== p[u]) {
    u = findSet(p[u]);
  }
  return u;
}

function unionSet(u, v) {
  const uR = findSet(u);
  const vR = findSet(v);

  if (uR === vR) return false;
  if (rank[uR] < rank[vR]) p[uR] = vR;
  else {
    p[vR] = uR;
    if (rank[uR] === rank[vR]) rank[uR]++;
  }

  return true;
}
