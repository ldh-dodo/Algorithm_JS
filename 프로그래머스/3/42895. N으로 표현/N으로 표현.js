function solution(N, number) {
    /*
    N을 사용한 사칙연산만으로 number을 표현하고, 가장 사용한 횟수가 적은 경우를 구하라.
    괄호와 사칙 연산만 가능
    나누기 연산에서 나머지는 무시
    최솟값 > 8 -> return -1
    
    
    */
    
    let dp = new Array(9).fill().map(() => new Set());

    for(let i = 1; i <= 8; i++) {
        dp[i].add(Number(String(N).repeat(i)));
        for(let j = 1; j < i; j++) {
            for(const num1 of dp[j]) {
                for(const num2 of dp[i - j]) {
                    dp[i].add(num1 + num2);
                    dp[i].add(num1 - num2);
                    dp[i].add(num1 * num2);
                    if(num2 !== 0) dp[i].add(Math.floor(num1 / num2));
                }
 
            }

        }
                                   if(dp[i].has(number)) return i;
    }  
    
    return -1;
}