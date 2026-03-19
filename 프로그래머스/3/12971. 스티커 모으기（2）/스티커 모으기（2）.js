function solution(sticker) {
    // 처음을 뜯는 경우
    // [0] 뜯고 시작. [1], [length - 1] 은 제외
    
    // 처음을 안뜯는 경우
    // [0]은 제외
    const len = sticker.length;
    
    if(len === 1) {
        return sticker[0];
    } else if(len === 2) {
        return Math.max(sticker[0], sticker[1]);
    }
    
    let max = -Infinity;
    const dp1 = Array(len).fill(-Infinity);
    const dp2 = Array(len).fill(-Infinity);
    
    dp1[0] = sticker[0];
    dp1[1] = dp1[0];
    
    for(let i = 2; i < len - 1; i++) {
        dp1[i] = Math.max(dp1[i - 2] + sticker[i], dp1[i - 1]);
        if(dp1[i] > max) max = dp1[i];
    }
   
    dp2[0] = 0;
    dp2[1] = sticker[1];
        
    for(let i = 2; i < len; i++) {
        dp2[i] = Math.max(dp2[i - 2] + sticker[i], dp2[i - 1]);
        if(dp2[i] > max) max = dp2[i];
    }

    
    
    return max;
}