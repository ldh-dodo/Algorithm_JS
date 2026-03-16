function solution(triangle) {
    const height = triangle.length;
    const dp = Array.from({length : height}, () => []);
        
    dp[0][0] = triangle[0][0];
    
    for(let i = 1; i < height; i++) {
        for(let j = 0; j < triangle[i].length; j++) {
            const leftP = dp[i - 1][j - 1];
            const rightP = dp[i - 1][j];
            
            dp[i][j] = Math.max(leftP || -Infinity, rightP || -Infinity, dp[i][j] || 0) + triangle[i][j]; 
        }
    }
    
    return Math.max(...dp[height - 1]);
}