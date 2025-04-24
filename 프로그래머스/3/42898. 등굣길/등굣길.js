function solution(m, n, puddles) {
    /*
        n : 행
        m : 열
        
        시작 좌표 (1,1)
        아래, 오른쪽으로만 이동 가능
    */
    const DIVISOR = 1000000007;
    
    let dp = Array.from({length : n + 1}, () => Array.from({length : m + 1}, () => 0));
           
    for(const [x, y] of puddles) {
        dp[y][x] = -1;
    }
    
    for(let i = 1; i <= m; i++) {
        if(dp[1][i] === -1) break;
        dp[1][i] = 1;
    }
    
    for(let i = 1; i <= n; i++) {
        if(dp[i][1] === -1) break;
         dp[i][1] = 1;  
    }

    
    for(let i = 2; i <= n; i++) {
        for(let j = 2; j <= m; j++) {
            if(dp[i][j] === -1) continue;
            
            dp[i][j] = ((dp[i][j - 1] === -1 ? 0 : dp[i][j - 1]) + 
                (dp[i - 1][j] === -1 ? 0 : dp[i - 1][j])) % DIVISOR;
        }
    }    
    
    return dp[n][m];
}