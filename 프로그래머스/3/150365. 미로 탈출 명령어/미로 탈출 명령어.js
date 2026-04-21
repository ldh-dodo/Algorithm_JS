function solution(n, m, y, x, c, r, k) {
    /*
    n x m  격자 미로
    (x, y) -> (r, c)로 이동하여 탈출
    
    문자열 사전순 빠른 순(dlru), 같은 격자 두 번 이상 방문 O, 총 거리가 k
     
    */
    
    const dy = [1, 0, 0, -1]; // dlru 순
    const dx = [0, -1, 1, 0];
    const char = ['d', 'l', 'r', 'u'];
    
    function dfs(x, y, dist, path) {
        if(dist === k) {
            if(x === r && y === c) return path.join('');
            return null;
        }
        
        if(dist > k) return null;
        if(!canSolve(x, y, r, c, k - dist)) return null;
            
        for(let dir = 0; dir < 4; dir++) {
            const ny = y + dy[dir];
            const nx = x + dx[dir];
            
            if(ny < 1 || nx < 1 || ny > n || nx > m) continue;
            
            
            path.push(char[dir]);
            const res = dfs(nx, ny, dist + 1, path);
            path.pop();
            
            if(res) return res;
        }
    }
    
    function canSolve(x, y, r, c, remain) {
        const diff = Math.abs(x-r) + Math.abs(y-c);
        
        if(remain < diff) return false;
        if((remain - diff) % 2 !== 0) return false;
        
        return true;
    }    
    
    const res = dfs(x, y, 0, []) || 'impossible';
    return res;
}