const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const n = Number(input[0]);
const edges = [];
const coord = Array(n);

const p = Array(n);
const rank = Array(n);
for (let i = 1; i <= n; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  coord[i - 1] = [x, y];
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const [cur, next] = [coord[i], coord[j]];
    if (i === j) continue;
    const w = Math.sqrt((cur[0] - next[0]) ** 2 + (cur[1] - next[1]) ** 2);
    edges.push([i, j, w]);
  }
}

// make-set
for (let i = 0; i < n; i++) {
  p[i] = i;
  rank[i] = 0;
}

console.log(kruskal(edges).toFixed(2));

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
    if (rank[vRoot] === rank[uRoot]) rank[uRoot]++;
  }

  return true;
}
