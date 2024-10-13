function solution(sticker) {
    // 첫 번째 스티커 뜯는 경우
    // 첫 번째 스티커 뜯지 않는 경우
    
    let len = sticker.length;
    if(len === 1) return sticker[0];
    
    let dp = new Array(len).fill(0);
    
    // 첫 번째 스티커 뜯고, 마지막 스티커 제외한 경우 (1 ~ len-1)
    dp[0] = sticker[0];
    dp[1] = sticker[0];
    
    for(let i = 2; i < len - 1; i++){
        dp[i] = Math.max(dp[i-1], dp[i-2] + sticker[i]);
    }
    let max = dp[len-2];
    
    dp = new Array(len).fill(0);
    
    dp[1] = sticker[1];
    
    for(let i = 2; i < len; i++){
        dp[i] = Math.max(dp[i-1], dp[i-2] + sticker[i]);
    }
    max = Math.max(max, dp[len-1]);
    
    return max;
}