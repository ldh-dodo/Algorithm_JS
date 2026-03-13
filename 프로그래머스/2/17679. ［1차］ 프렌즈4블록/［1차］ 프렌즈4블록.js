function solution(m, n, board) {
    // m * n
    var answer = 0;
    board = board.map((row) => row.split(''));
    
    while(true) {
        const target = [];    
        
        for(let y = 0; y < m - 1; y++) {
            for(let x = 0; x < n - 1; x++) {
                const cur = board[y][x];

                if(cur === null) continue;
                
                if(cur === board[y][x+1] &&
                   cur === board[y+1][x] &&
                   cur === board[y+1][x+1]) {
                    target.push([y, x], [y, x + 1], [y + 1, x], [y + 1, x + 1]);
                }
            }
        }
        

        const uniqueTarget = Array.from(new Set(target.map(([y, x]) => `${y},${x}`))).map((line) => line.split(',').map(Number));
        
        if(uniqueTarget.length === 0) break;
  
        for(const [y, x] of uniqueTarget) board[y][x] = null;
        answer += uniqueTarget.length;
        
        // null이 아닌 블록들 떨어뜨리기
        for(let x = 0; x < n; x++) {
            let ty = m - 1;
            
            for(let y = m - 1; y >= 0; y--) {
                if(board[ty][x] !== null) {
                    ty--;
                    continue;
                }
                
                if(y >= ty) continue;
                if(board[y][x] !== null) {
                    board[ty][x] = board[y][x];
                    board[y][x] = null;
                    ty--;
                }
            }            
        }
    }
    
    return answer;
}