function solution(alp, cop, problems) {
    /*
        알고력, 코딩력 >= 0
        문제를 풀기위해 알고력과 코딩력이 필요함
        
        특정 문제가 요구하는 알고력과 코딩력 중 하나라도 부족하면 문제를 풀 수 없음
        
        - 알고력과 코딩력을 높이는 두 가지 방법
        1의 시간을 사용하면 알고력 또는 코딩력을 높일 수 있음
        풀 수 있는 문제 중 하나를 풀어, 문제가 보상하는 알고력과 코딩력을 높일 수 있음
        
        모든 문제들을 풀 수 있는 알고력과 코딩력을 얻는 최단시간을 구하려고 한다.
        
        
    */
    
    let [maxAl, maxCo] = [alp, cop];
    for(const [al, co] of problems) {
        maxAl = Math.max(maxAl, al);
        maxCo = Math.max(maxCo, co);
    }
    
    const dp = new Array(maxAl + 1).fill().map(() => new Array(maxCo + 1).fill(Infinity));
    dp[alp][cop] = 0;
    
    for(let i = alp; i <= maxAl; i++) {
        for(let j = cop; j <= maxCo; j++) {
            if(i < maxAl) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
            if(j < maxCo) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
            if(i === maxAl && j === maxCo) break;
            
            for(const [alReq, coReq, alRwd, coRwd, cost] of problems) {
                if(i < alReq || j < coReq) continue;
                
                const curAl = (i + alRwd > maxAl) ? maxAl : i + alRwd;
                const curCo = (j + coRwd > maxCo) ? maxCo : j + coRwd;
                
                dp[curAl][curCo] = Math.min(dp[curAl][curCo], dp[i][j] + cost);
            } 
        }
    }
    
    return dp[maxAl][maxCo];
}
