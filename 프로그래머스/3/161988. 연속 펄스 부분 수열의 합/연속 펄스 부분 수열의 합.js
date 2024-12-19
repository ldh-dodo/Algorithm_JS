function solution(sequence) {    
    // 기본적으로 순회시 O(N^2) 
    
    let curValue;
    let temp = new Array(sequence.length).fill(1);
    
    // 펄스 수열이 1, -1 .. 일 때 
    let purse1 = temp.map((ONE, idx) => idx % 2 === 0 ? 1 : -1);
    
    // 펄스 수열이 -1, 1 .. 일 때 
    let purse2 = purse1.map((item) => item * -1);
    
    // dp
    let [dp1, dp2] = [new Array(sequence.length), new Array(sequence.length)];

    dp1[0] = sequence[0] * purse1[0];
    dp2[0] = sequence[0] * purse2[0];
    
    /*
        -2, 3, 6, 1, 3
        
        if dp[x-1] < 0 :
            dp[x] = sequence[x] * purse[x]
        else :
            dp[x] = dp[x - 1] + sequence * purse[x]
    */
    
    sequence.forEach((item, idx) => {
        if(idx === 0) return;
        
        curValue = item * purse1[idx];
        
        if(dp1[idx - 1] < 0) {
            dp1[idx] = curValue;
            return;
        }
        
        dp1[idx] = dp1[idx - 1] + curValue;
    })
    
   
    sequence.forEach((item, idx) => {
        if(idx === 0) return;
        
        curValue = item * purse2[idx];
        
        if(dp2[idx - 1] < 0) {
            dp2[idx] = curValue;
            return;
        }
        
        dp2[idx] = dp2[idx - 1] + curValue;
    })
    
    const max1 = dp1.reduce((acc, val) => Math.max(acc,val) , -Infinity);
    const max2 = dp2.reduce((acc, val) => Math.max(acc,val) , -Infinity);
    
    return Math.max(max1, max2);
}