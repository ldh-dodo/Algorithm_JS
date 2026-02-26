const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(input[0]);
const arr = [...input[1].split(" ").map(Number)];

const lis = [arr[0]];

for (let i = 1; i < arr.length; i++) {
  const num = arr[i];

  const lowerIdx = lowerbound(lis, num);

  if (lowerIdx === arr.length) lis.push(num);
  else lis[lowerIdx] = num;
}

console.log(arr.length - lis.length);

function lowerbound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = (left + right) >> 1;

    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}
