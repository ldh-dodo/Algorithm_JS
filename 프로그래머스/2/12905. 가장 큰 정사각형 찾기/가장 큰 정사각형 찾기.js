function solution(board) {
    const n = board.length;
    const m = board[0].length;
    const dp = Array.from({length : n}, () => Array(m).fill(0));
    let max = 0;
    // dp[y][x] : (y, x)를 우하단 꼭짓점으로 하는 가장 큰 정사각형 길이
    
    for(let y = 0; y < n; y++) {
        for(let x = 0; x < m; x++) {
            if(board[y][x] === 0) {
                dp[y][x] = 0;
            } else {
                if(y === 0 || x === 0) {
                    dp[y][x] = 1;
                } else {
                    dp[y][x] = Math.min(dp[y-1][x], dp[y][x-1], dp[y-1][x-1]) + 1;
                }              
            }
            
            max = Math.max(dp[y][x], max);
        }
    }
    
    return max * max;
}