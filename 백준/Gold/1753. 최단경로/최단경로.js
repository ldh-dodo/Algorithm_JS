class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = (i - 1) >> 1;

      if (this.heap[parent][0] <= this.heap[i][0]) break;

      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;

    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
      if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;

      if (smallest === i) break;

      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }

    return top;
  }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [V, E] = input[0].split(" ").map(Number);
const start = Number(input[1]);
const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 2; i < input.length; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  graph[u].push([v, w]); // [next, weight]
}

const dist = dijkstra(graph, start, V);

for (let i = 1; i < dist.length; i++) {
  if (dist[i] === Infinity) console.log("INF");
  else console.log(dist[i]);
}

function dijkstra(graph, start, n) {
  const dist = Array(n + 1).fill(Infinity);
  dist[start] = 0;

  const pq = new MinHeap(); // [cost, node]
  pq.push([0, start]);

  while (pq.size() > 0) {
    const [cost, cur] = pq.pop();

    if (cost > dist[cur]) continue;

    for (const [next, w] of graph[cur]) {
      const newCost = cost + w;
      if (newCost < dist[next]) {
        dist[next] = newCost;
        pq.push([newCost, next]);
      }
    }
  }

  return dist;
}
