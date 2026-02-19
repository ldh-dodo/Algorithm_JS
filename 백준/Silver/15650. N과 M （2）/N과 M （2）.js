const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, r] = input[0].split(' ').map(Number);
const arr = Array.from({ length: n }, (_, i) => i + 1);

console.log(
  combination(arr, r)
    .map((c) => c.join(' '))
    .join('\n')
);

function combination(arr, r) {
  const result = [];

  function dfs(path, start) {
    if (path.length === r) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      dfs(path, i + 1);
      path.pop();
    }
  }

  dfs([], 0);
  return result;
}
