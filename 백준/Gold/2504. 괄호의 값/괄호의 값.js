const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const str = input[0];

/**
 * 사용 가능한 기호
 * (
 * )
 * [
 * ]
 *
 * 올바르지 못한 괄호열은 0 을 출력
 *
 * 올바른 괄호열은 괄호값 계산
 *
 * () : 2
 * [] : 3
 * (x) : 2 * x
 * [x] : 3 * x
 * xy : x + y
 *
 * 열린 괄호일 때는 재귀, 닫는 괄호일 때는 재귀 반환
 */

let pos = 0;
const result = calculate();
console.log(result === null || pos !== str.length ? 0 : result);

function calculate() {
  let sum = 0;

  while (pos < str.length) {
    if (str[pos] === "(") {
      pos++;
      let val = calculate();

      if (val === null) return null;

      if (str[pos] === ")") {
        pos++;
        sum += val === 0 ? 2 : val * 2;
      } else {
        return null;
      }
    } else if (str[pos] === "[") {
      pos++;
      let val = calculate();

      if (val === null) return null;

      if (str[pos] === "]") {
        pos++;
        sum += val === 0 ? 3 : val * 3;
      } else {
        return null;
      }
    } else if (str[pos] === ")" || str[pos] === "]") return sum;
    else return null;
  }

  return sum;
}
