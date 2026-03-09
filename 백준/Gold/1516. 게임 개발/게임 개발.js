const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const N = Number(input[0]);
const graph = Array.from({ length: N + 1 }, () => []);
const dp = Array(N + 1);
const indegree = Array(N + 1).fill(0);
const cost = Array(N + 1).fill(0);
const q = [];

for (let i = 1; i <= N; i++) {
  const t = input[i].split(" ").map(Number);

  for (let j = 0; j < t.length; j++) {
    if (t[j] === -1) break;
    if (j === 0) {
      dp[i] = t[0];
      cost[i] = t[0];
    } else {
      graph[t[j]].push(i);
      indegree[i]++;
    }
  }
}

for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) q.push(i);
}

let head = 0;

while (head < q.length) {
  const cur = q[head++];

  for (const next of graph[cur]) {
    dp[next] = Math.max(dp[next], dp[cur] + cost[next]);
    indegree[next]--;
    if (indegree[next] === 0) q.push(next);
  }
}

console.log(dp.slice(1).join("\n"));
