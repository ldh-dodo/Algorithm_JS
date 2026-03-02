const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [V, E] = input[0].split(" ").map(Number);
const edges = [];
const p = Array(V + 1);
const rank = Array(V + 1);

// make set
for (let i = 1; i <= V; i++) {
  p[i] = i;
  rank[i] = 0;
}

for (let i = 0; i < E; i++) {
  edges.push(input[i + 1].split(" ").map(Number));
}

console.log(kruskal(edges));

function findSet(u) {
  while (u !== p[u]) u = p[u] = p[p[u]];
  return u;
}

function union(u, v) {
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

function kruskal(edges) {
  edges.sort((a, b) => a[2] - b[2]);

  let cost = 0;
  for (const [u, v, w] of edges) {
    if (union(u, v)) cost += w;
  }

  return cost;
}
