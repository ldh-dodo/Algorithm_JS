const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const arr = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);

for (let i = 1; i < input.length; i++) {
  const [u, v] = input[i].split(" ").map(Number);

  arr[u].push(v);
  arr[v].push(u);
}

let answer = 0;

for (let i = 1; i <= N; i++) {
  if (visited[i]) continue;

  visited[i] = true;
  answer++;
  const queue = [i];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];

    for (const next of arr[node]) {
      if (visited[next]) continue;

      visited[next] = true;
      queue.push(next);
    }
  }
}

console.log(answer);
