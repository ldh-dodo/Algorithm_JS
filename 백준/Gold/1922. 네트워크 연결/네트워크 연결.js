const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const M = Number(input[1]);
const rank = Array(N + 1);
const p = Array(N + 1);
const edges = input.slice(2).map((line) => line.split(" ").map(Number));

// make-set
for (let i = 1; i <= N; i++) {
  p[i] = i;
  rank[i] = 0;
}

console.log(kruskal(edges));

function kruskal(edges) {
  let sum = 0;
  edges.sort((a, b) => a[2] - b[2]);
  for (const [a, b, w] of edges) {
    if (union(a, b)) {
      sum += w;
    }
  }
  return sum;
}

function findSet(u) {
  while (u !== p[u]) u = p[u] = p[p[u]];
  return u;
}

function union(u, v) {
  const uRoot = findSet(u);
  const vRoot = findSet(v);

  if (uRoot === vRoot) return false;
  if (rank[uRoot] < rank[vRoot]) p[uRoot] = vRoot;
  else {
    p[vRoot] = uRoot;
    if (rank[vRoot] === rank[uRoot]) {
      rank[uRoot]++;
    }
  }

  return true;
}
