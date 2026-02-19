const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [L, C] = input[0].split(" ").map(Number);

const arr = input[1].split(" ").sort();
const vowels = new Set(["a", "e", "i", "o", "u"]);

const combinations = combination(arr, L);

let result = combinations.filter((rows) => {
  let count = 0;

  for (const alpha of rows) {
    if (vowels.has(alpha)) count++;
  }

  // 모음이 1개 이상, C-2개 이하면 OK
  return count >= 1 && count <= L - 2;
});

console.log(result.map((rows) => rows.join("")).join("\n"));

function combination(arr, r) {
  const result = [];
  if (r === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combinations = combination(rest, r - 1);
    const attached = combinations.map((c) => [fixed, ...c]);
    result.push(...attached);
  });

  return result;
}
