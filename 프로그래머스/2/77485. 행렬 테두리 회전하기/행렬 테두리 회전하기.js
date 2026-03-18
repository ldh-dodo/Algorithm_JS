function solution(n, m, queries) {
    var answer = [];
    const board = Array.from({length: n}, () => Array(m));
    let num = 1;
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            board[i][j] = num++;
        } 
    }
    
    const dy = [0, 1, 0, -1]; // 우 하 좌 상
    const dx = [1, 0, -1, 0];
    
    for(let [y1, x1, y2, x2] of queries) {
        [x1, y1, x2, y2] = [x1 - 1, y1 - 1, x2 - 1, y2 - 1];
       
        let copyNum = board[y1][x1];
        let dir = 0;
        
        let y = y1, x = x1;
        let min = board[y][x];
        
        while(true){                                
            const ny = y + dy[dir];
            const nx = x + dx[dir];
                
            if(ny < y1 || ny > y2 || nx < x1 || nx > x2) {
                dir = (dir + 1) % 4;
                continue;
             }
                
            [copyNum, board[ny][nx]] = [board[ny][nx], copyNum];
            min = Math.min(min, copyNum);
            
            y = ny;
            x = nx;
            if(y === y1 && x === x1) break;
        }
        
        answer.push(min);
    }
    
    return answer;
}