function solution(sticker) {
    const SIZE = sticker.length;
          
    if(SIZE === 1) return sticker[0];
    
    let dp1 = new Array(SIZE).fill(0);
    let dp2 = new Array(SIZE).fill(0);
    
    dp1[0] = sticker[0];
    dp1[1] = sticker[0];
    
    for(let i = 2; i < SIZE - 1; i++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i]);
    }
    
    let max = dp1[SIZE - 2];

    dp2[1] = sticker[1];
    
    for(let i = 2; i < SIZE; i++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i]);
    }
    
    max = Math.max(max, dp2[SIZE - 1]);
    
    return max;
}