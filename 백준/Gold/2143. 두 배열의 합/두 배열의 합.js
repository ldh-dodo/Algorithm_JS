const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);
const n = Number(input[1]);
const m = Number(input[3]);

const A = input[2].split(' ').map(Number);
const B = input[4].split(' ').map(Number);
const BMap = new Map();


for(let i = 0; i < m; i++) {
  let sum = 0;
  for(let j = i; j < m; j++) {
    sum += B[j]; 
    BMap.set(sum, (BMap.get(sum) || 0) + 1);
  } 
}

let answer = 0; 

for(let i = 0; i < n; i++) {
  let sum = 0;
  for(let j = i; j < n; j++) {
    sum += A[j];
    const target = T - sum
    if(BMap.has(target)) { // BS[y] = T - SA[x] 를 이용
      answer += BMap.get(target);
    } 
  }
}

console.log(answer);