const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(input[0]);
const arr = [...input[1].split(" ").map(Number)];

let lis = [arr[0]];

for (let i = 1; i < arr.length; i++) {
  const num = arr[i];
  let lowerIdx = lowerbound(lis, num);

  // num보다 큰 값이 없다면 맨 뒤에
  if (lowerIdx === lis.length) lis.push(num);
  else lis[lowerIdx] = num;
}

console.log(lis.length);

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
