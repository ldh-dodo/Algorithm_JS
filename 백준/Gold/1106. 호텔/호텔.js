const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

// 적어도 C명 늘리기위해 투자해야하는 돈의 최솟값
// N : 도시 수
const [C, N] = input[0].split(" ").map(Number);
const city = []; // [홍보할 때 비용, 비용으로 얻을 수 있는 고객수]
let maxPeople = -1;

for (let i = 1; i < input.length; i++) {
  city.push(input[i].split(" ").map(Number));
  maxPeople = Math.max(maxPeople, city[i - 1][1]);
}

// dp[c] -> c명 늘이기 위한 돈의 최소값. c + maxPeople - 1 까지 탐색 필요
const dp = Array.from({ length: C + maxPeople }, () => Infinity);

// dp 초기화
dp[0] = 0;

for (let i = 0; i < city.length; i++) {
  const [cost, people] = city[i];
  dp[people] = Math.min(dp[people], cost);
}

for (let i = 1; i < dp.length; i++) {
  for (let j = 0; j < city.length; j++) {
    const [cost, people] = city[j];

    if (i - people < 0) continue;

    dp[i] = Math.min(dp[i], dp[i - people] + cost);
  }
}

let result = Infinity;

for (let i = C; i < dp.length; i++) {
  result = Math.min(result, dp[i]);
}

console.log(result);
