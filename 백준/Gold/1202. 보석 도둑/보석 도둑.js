class MaxHeap {
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

      if (this.heap[parent][1] > this.heap[i][1]) break;
      if (this.heap[parent][1] === this.heap[i][1] && this.heap[parent][0] <= this.heap[i][0]) break;
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
      let largest = i;
      const left = i * 2 + 1;
      const right = i * 2 + 2;

      if (left < this.heap.length && this.heap[left][1] > this.heap[largest][1]) largest = left;
      if (
        left < this.heap.length &&
        this.heap[left][1] === this.heap[largest][1] &&
        this.heap[left][0] < this.heap[largest][0]
      )
        largest = left;

      if (right < this.heap.length && this.heap[right][1] > this.heap[largest][1]) largest = right;
      if (
        right < this.heap.length &&
        this.heap[right][1] === this.heap[largest][1] &&
        this.heap[right][0] < this.heap[largest][0]
      )
        largest = right;

      if (i === largest) break;

      [this.heap[largest], this.heap[i]] = [this.heap[i], this.heap[largest]];
      i = largest;
    }

    return top;
  }
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");
const [N, K] = input[0].split(" ").map(Number); // N : 보석 개수 K: 가방 개수
const jewel = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number)); // [[w, cost]]
const bagW = input.slice(1 + N).map(Number); // [[maxW]]
const pq = new MaxHeap();
let sum = 0;
let jewelIdx = 0;

bagW.sort((a, b) => a - b);
jewel.sort((a, b) => a[0] - b[0]);

for (const maxW of bagW) {
  while (jewelIdx < jewel.length && jewel[jewelIdx][0] <= maxW) {
    pq.push(jewel[jewelIdx]);
    jewelIdx++;
  }

  if (pq.size() > 0) {
    const [w, cost] = pq.pop();
    sum += cost;
  }
}

console.log(sum);
