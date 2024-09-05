function solution(land) {
    let answer = 0;
    let dp = new Array(land.length).fill(0).map(()=> new Array(4).fill(0))
   
    
    // N행 4열
    // 1행부터 땅을 밟으며 한 행씩 내려옴
    // 한 행씩 내려올 때,각 행의 4칸 중 한 칸만 밟을 수 있음
    // 이 때, 같은 열을 연속해서는 불가능
    
    // 모두 내려왔을 때 얻을 수 있는 점수의 최대값을 구하라
    // dp를 이용해야 할 것 같음.
    
    // 1 2 3 5
    // 5 6 7 8
    // 4 3 77 1
    
    for(let i = 0; i < 4; i++){
        dp[0][i] = land[0][i];
    }
    for(let i = 1; i < land.length; i++){        
        dp[i][0] = land[i][0] + Math.max(dp[i-1][1], dp[i-1][2], dp[i-1][3]);
        dp[i][1] = land[i][1] + Math.max(dp[i-1][0], dp[i-1][2], dp[i-1][3]);
        dp[i][2] = land[i][2] + Math.max(dp[i-1][0], dp[i-1][1], dp[i-1][3]);
        dp[i][3] = land[i][3] + Math.max(dp[i-1][0], dp[i-1][1], dp[i-1][2]);
    }
    
    return Math.max(...dp[dp.length-1]);
}