function solution(target) {    
    let dp = Array.from({length : target + 1}, () => [Infinity, 0]);
    
    for(let i = 1; i <= target; i++){
        if(i <= 20) {
            dp[i] = [1,1];
            continue;
        } else if(i <= 60 && i % 3 === 0) {
            dp[i] = [1, 0];
            continue;
        } else if(i <= 40 && i % 2 === 0) {
            dp[i] = [1, 0];
            continue;
        } else if(i === 50){
            dp[i] = [1, 1];
            continue;
        }
        
        for(let j = 1; j <= 20; j++) {
            for(let k = 1; k <= 3; k++) {
                if(i < j * k) break;
                
                const [bDP1, bDP2] = [dp[i - j * k], dp[j * k]];
                
                if(dp[i][0] > bDP1[0] + bDP2[0]) {
                    dp[i] = [bDP1[0] + bDP2[0], bDP1[1] + bDP2[1]];
                    continue;
                }
                
                if(dp[i][0] === bDP1[0] + bDP2[0] && dp[i][1] < bDP1[1] + bDP2[1]) {
                    dp[i] = [bDP1[0] + bDP2[0], bDP1[1] + bDP2[1]];
                    continue;
                }
            }
        }
        
        if(i >= 50) {
            const [bDP1, bDP2] = [dp[i - 50], dp[50]];
            
            if(dp[i][0] > bDP1[0] + bDP2[0]) {
                dp[i] = [bDP1[0] + bDP2[0], bDP1[1] + bDP2[1]];
                continue;
            }
                
            if(dp[i][0] === bDP1[0] + bDP2[0] && dp[i][1] < bDP1[1] + bDP2[1]) {
                dp[i] = [bDP1[0] + bDP2[0], bDP1[1] + bDP2[1]];
                continue;
            }
        }
    }
    
    return dp[target];
}