function solution(board) {
    /*
    1: 벽
    0: 비어있음
    
    출발점 : (0, 0) -> 도착점 (N - 1, N - 1)
    
    자동차가 도착점까지 무사히 도달할 수 있게 경주로를 건설 
    벽이 있는 칸에는 경주로 건설 불가
    
    직선 도로 : 100원
    코너 추가 비용 : 500원
    
    dp[y][x][dir] : (y, x) 에 도달할 수 있도록 경주로를 건설했을 때의 최소 비용
    */
    
    const N = board.length;
    const dp = Array.from({length : N}, () => Array.from({length : N}, () => Array(4).fill(Infinity)));
    
    for(let dir = 0; dir < 4; dir++) {
        dp[0][0][dir] = 0;
    }
    
    const dy = [-1, 1, 0, 0]; // 상 하 좌 우
    const dx = [0, 0, -1, 1];
    
    const q = [];  // [y, x, cost, dir]
    
    if(board[1][0] !== 1) q.push([0, 0, 0, 1]); // 하
    if(board[0][1] !== 1) q.push([0, 0, 0, 3]); // 우

    while(q.length) {
        const [y, x, cost, d] = q.shift(); 
        
        for(let dir = 0; dir < 4; dir++) {
            const ny = y + dy[dir];
            const nx = x + dx[dir];
            
            if(ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
            if(board[ny][nx] === 1) continue;
            
            let nextCost = cost + 100;
            
            if(dir !== d) nextCost += 500;
            if(nextCost >= dp[ny][nx][dir]) continue;
            
            dp[ny][nx][dir] = nextCost;
            q.push([ny, nx, nextCost, dir]);
        }
    }
    
    return Math.min(...dp[N - 1][N - 1]);
}