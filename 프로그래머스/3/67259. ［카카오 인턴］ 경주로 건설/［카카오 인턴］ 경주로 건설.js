function solution(board) {
    // 방향을 값으로 표현. 0/1/2/3 : 상/하/좌/우
    
    const dir = [ 
        [-1,0],
        [1,0],
        [0,-1],
        [0,1],
    ];
    
    const len = board.length;
    const dp = Array(len).fill().map(() => Array(len).fill().map(() => Array(4).fill(Infinity)));
    // [y, x, dir]
    
    const q = [
        [0, 0, 0, 3],
        [0, 0, 0, 1],
    ];
    // [y, x, cost, dir]
    
    const isValid = 
        (y, x) => y >= 0 && x >= 0 
                    && y < len && x < len 
                    && board[y][x] != 1;
    
    while(q.length > 0) {
        const [y, x, curCost, curDirection] = q.shift();
        
        for(let nextDirection = 0; nextDirection < dir.length; nextDirection++) {
            let [dy, dx] = dir[nextDirection];
            let [ny, nx] = [y + dy, x + dx];
            
            if(!isValid(ny, nx)) continue;
            
            let nextCost = curCost + 100;
            
            if(curDirection !== nextDirection) nextCost += 500;
            if(nextCost >= dp[ny][nx][nextDirection]) continue;
            
            dp[ny][nx][nextDirection] = nextCost;
            q.push([ny, nx, nextCost, nextDirection]);
        }
    }
    
    return Math.min(...dp[len-1][len-1]);
}