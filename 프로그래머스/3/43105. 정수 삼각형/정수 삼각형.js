function solution(triangle) {
    const SIZE = triangle.length;

    let dp = Array.from({length : SIZE}, () => Array.from({length : SIZE}, () => 0));
    
    dp[0][0] = triangle[0][0];
    dp[1][0] = dp[0][0] + triangle[1][0];
    dp[1][1] = dp[0][0] + triangle[1][1];
    
    for(let i = 2; i < SIZE; i++) {
        for(let j = 0; j < triangle[i].length; j++) {
            // 다음 dp = 1. 기존 저장된 dp 값, 2. 이전 dp + 좌상단 triangle 값 3. 이전 dp + 우상단 triangle 값
            let max = Math.max((dp[i - 1][j - 1] | -Infinity), (dp[i - 1][j] | -Infinity));
            dp[i][j] = Math.max(dp[i][j], triangle[i][j] + max);
        }
    }
    
    return Math.max(...dp[SIZE - 1]);
}