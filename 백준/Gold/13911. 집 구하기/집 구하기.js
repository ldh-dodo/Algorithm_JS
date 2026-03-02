class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
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

function dijkstra(graph, starts, n) {
  const dist = Array(n + 1).fill(Infinity);
  const pq = new MinHeap();

  for (const start of starts) {
    dist[start] = 0;
    pq.push([0, start]);
  }

  while (pq.size() > 0) {
    const [cost, node] = pq.pop();

    if (cost > dist[node]) continue;
    for (const [next, w] of graph[node]) {
      const newCost = cost + w;
      if (newCost < dist[next]) {
        dist[next] = newCost;
        pq.push([newCost, next]);
      }
    }
  }

  return dist;
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const graph = Array.from({ length: V + 1 }, () => []); // [node, weight]

for (let i = 0; i < E; i++) {
  const [u, v, w] = input[i + 1].split(" ").map(Number);
  graph[u].push([v, w]);
  graph[v].push([u, w]);
}

const [M, x] = input[E + 1].split(" ").map(Number);
const mcSet = new Set(input[E + 2].split(" ").map(Number));
const [S, y] = input[E + 3].split(" ").map(Number);
const stSet = new Set(input[E + 4].split(" ").map(Number));

// x: 맥세권 최대 거리 y : 스세권 최대 거리
// mcArr: 맥도날드 정점 배열 stArr: 스타벅스 정점 배열

const mcDist = dijkstra(graph, mcSet, V);
const stDist = dijkstra(graph, stSet, V);

let answer = Infinity;

for (let i = 1; i <= V; i++) {
  if (mcSet.has(i) || stSet.has(i)) continue;
  if (mcDist[i] > x || stDist[i] > y) continue;
  answer = Math.min(answer, mcDist[i] + stDist[i]);
}

console.log(answer === Infinity ? -1 : answer);
