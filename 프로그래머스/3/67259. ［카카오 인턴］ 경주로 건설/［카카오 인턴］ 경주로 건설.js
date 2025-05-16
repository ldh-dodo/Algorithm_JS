function solution(board) {
    // 모든 도로는 100원
    // 이전 도로와 직각(코너 도로) 였다면, 500원 추가
    
    // 0, 1, 2, 3 -> 상 하 좌 우
    let answer = [];
    let dy = [-1, 1, 0, 0];
    let dx = [0, 0, -1, 1];
        
    let N = board.length;
    let cost = new Array(N).fill().map(() => new Array(N).fill().map(() => new Array(4).fill(Infinity)));

    let q = [];
    
    if(board[0][1] !== 1) q.push([0, 0, 0, 3]); // [y, x, cost, dir]
    if(board[1][0] !== 1) q.push([0, 0, 0, 1]);
    
    while(q.length > 0) {
        const [cy, cx, curCost, curDir] = q.shift();
        
        for(let i = 0; i < 4; i++) {
            const ny = cy + dy[i];
            const nx = cx + dx[i];
            
            if(ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
            if(board[ny][nx] === 1) continue;
            
            let nextCost = curCost + 100;
            
            if(i !== curDir) nextCost += 500;
            if(nextCost >= cost[ny][nx][i]) continue;
            
            cost[ny][nx][i] = nextCost;
            q.push([ny, nx, nextCost, i]);
        }
    }
    
    return Math.min(...cost[N-1][N-1]);
}