const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, r] = input[0].split(' ').map(Number);
const arr = Array.from({ length: n }, (_, i) => i + 1);

console.log(
  permutation(arr, r)
    .map((p) => p.join(' '))
    .join('\n')
);

function permutation(arr, r) {
  const result = [];
  const visited = Array(arr.length).fill(false);

  function dfs(path) {
    if (path.length === r) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      path.push(arr[i]);
      dfs(path);
      path.pop();
      visited[i] = false;
    }
  }

  dfs([]);
  return result;
}
