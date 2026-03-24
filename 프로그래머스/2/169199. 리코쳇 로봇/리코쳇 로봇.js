function solution(board) {
    board = board.map((row) => row.split(''));
    
    const n = board.length;
    const m = board[0].length;
    const visited = Array.from({length : n}, 
                               () => Array.from({length : m}, 
                                                () => Array(4).fill(false)));
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const q = [];
    let targetY = null, targetX = null;
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(board[i][j] === 'R') {
                q.push([i, j, 0]); // [y, x, cnt]
                
            }
            if(board[i][j] === 'G') {
                targetY = i;
                targetX = j;
            }
        }
    }
    
    let head = 0;
    while(head < q.length) {
        const [y, x, cnt] = q[head++];
        
        if(y === targetY && x === targetX) return cnt;
        
        for(let dir = 0; dir < 4; dir++) {
            let ny = y, nx = x;
            
            while(true) {                
                let ty = ny + dy[dir];
                let tx = nx + dx[dir];
                
                if(ty < 0 || tx < 0 || ty >= n || tx >= m) break;
                if(board[ty][tx] === 'D') break;
                
                ny = ty;
                nx = tx;
            }
            
            if(ny === y && nx === x) continue;
            if(visited[ny][nx][dir]) continue;
            
            visited[ny][nx][dir] = true;
            q.push([ny, nx, cnt + 1]);
        }
    }
    
    return -1;
}