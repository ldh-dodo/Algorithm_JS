const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);
const result = [];

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(" ").map(Number); // [A, B] : A가 학생 B 앞에 서야함
  graph[A].push(B);
  indegree[B]++;
}

const q = [];
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) q.push(i);
}

let head = 0;

while (head < q.length) {
  const cur = q[head++];
  result.push(cur);

  for (const next of graph[cur]) {
    indegree[next]--;
    if (indegree[next] === 0) q.push(next);
  }
}

console.log(result.join(" "));
