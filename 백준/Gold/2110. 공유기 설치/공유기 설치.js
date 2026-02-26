const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, C] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 0; i < N; i++) {
  arr.push(Number(input[i + 1]));
}

arr.sort((a, b) => a - b);

let left = 1;
let right = arr[arr.length - 1] - arr[0] + 1;

while (left < right) {
  let mid = (left + right) >> 1;

  if (canInstall(mid)) {
    left = mid + 1;
  } else right = mid;
}

console.log(left - 1);

function canInstall(dist) {
  let cnt = 1;
  let last = arr[0];

  for (let i = 1; i < N; i++) {
    if (arr[i] - last >= dist) {
      cnt++;
      last = arr[i];
    }

    if (cnt >= C) break;
  }

  return cnt >= C;
}
