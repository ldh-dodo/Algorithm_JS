const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const T = Number(input[0]);
let idx = 1;

for (let t = 0; t < T; t++) {
  const [N, K] = input[idx++].split(" ").map(Number); // N : 건물의 개수 K: 건설 순서 규칙 개수
  const cost = [0, ...input[idx++].split(" ").map(Number)];

  const graph = Array.from({ length: N + 1 }, () => []);
  const indegree = Array(N + 1).fill(0);
  const dp = Array(N + 1).fill(0);

  let len = idx + K;

  while (idx < len) {
    const [a, b] = input[idx++].split(" ").map(Number);
    graph[a].push(b);
    indegree[b]++;
  }

  const target = Number(input[idx++]);

  const q = [];
  let head = 0;

  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      dp[i] = cost[i];
      q.push(i);
    }
  }

  while (head < q.length) {
    const cur = q[head++];

    for (const next of graph[cur]) {
      dp[next] = Math.max(dp[next], dp[cur] + cost[next]);
      indegree[next]--;

      if (indegree[next] === 0) q.push(next);
    }
  }

  console.log(dp[target]);
}
