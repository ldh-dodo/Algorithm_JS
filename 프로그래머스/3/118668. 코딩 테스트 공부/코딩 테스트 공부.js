function solution(alp, cop, problems) {
    /*
        - 문제의 요구치 이상의 알고력과 코딩력이 되어야 문제를 풀 수 있음
        
        알고력 코딩력 높이는 방법 
        공부
        - 알고력 1을 높이는데 1의 시간
        - 코딩력 1을 높이는데 1의 시간
        문제 풀이
        - 풀 수 있는 문제를 풀기.(문제마다 오르는 알고력과 코딩력이 정해짐, 반복 풀이 가능)
        
        모든 문제들을 풀 수 있는 알고력과 코딩력을 얻는 최단시간 구하기
    */
    /* 
        단순하게 그리디로 접근해서는 안될듯
        만약, 초기 요구치가 높지만, 알고력과 코딩력을 많이 보상하는 문제라면, 공부에 시간을 많이 쏟고 
        그 문제를 풂으로써, 시간을 단축시킬 수도 있음.
        
        결국 dp로 모든 케이스를 다 봐야할듯
    */
    
    let [maxAlp, maxCop] = [alp, cop];
    for(const [alp, cop] of problems) {
        maxAlp = Math.max(maxAlp, alp);
        maxCop = Math.max(maxCop, cop);
    }
    
    let dp = Array.from({length : maxAlp + 1}, () => Array.from({length : maxCop + 1}, () => Infinity));

    dp[alp][cop] = 0;
    
    for(let i = alp; i <= maxAlp; i++) {
        for(let j = cop; j <= maxCop; j++) {
            if(i < maxAlp) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
            if(j < maxCop) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
            if(i === maxAlp && j === maxCop) break;
            
            for(const [alpReq, copReq, alpRwd, copRwd, cost] of problems) {
                if(i < alpReq || j < copReq) continue;
                
                let curAlp = (i + alpRwd > maxAlp) ? maxAlp : i + alpRwd;
                let curCop = (j + copRwd > maxCop) ? maxCop : j + copRwd;
                
                dp[curAlp][curCop] = Math.min(dp[curAlp][curCop], dp[i][j] + cost);
            }
        }
    }
    
    return dp[maxAlp][maxCop];
}