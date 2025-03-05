function solution(n, m, x, y, r, c, k) {
    /* 사전순 d l r u 
       (x,y) -> (r,c) 로 이동하는 거리가 k여야 함
       같은 격자를 두 번 이상 방문해도 됨.
       탈출 못할 경우 "impossible" 
       
       좌측 상단 (1,1)
       우측 하단(n,m)
       . : 빈 공간
       S : 출발 지점
       E : 탈출 지점
    */ 
        
    function canReach(curY, curX, movesLeft) {
        const remainDist = Math.abs(curY - r) + Math.abs(curX - c);
        
        if(remainDist > movesLeft) return false;
        if((remainDist - movesLeft) % 2 !== 0) return false;
        
        return true;
    }
    
    function dfs(curY, curX, movesLeft) {
        if(movesLeft === 0) {
            if(curY === r && curX === c) {
                return path.join('');
            }
            
            return null;
        }
        
        if(!canReach(curY, curX, movesLeft)) return null;

        for(const [dy, dx, pathStr] of dir) {
            const ny = curY + dy;
            const nx = curX + dx;
            
            if(ny <= 0 || ny > n || nx <= 0 || nx > m) continue;
            
            path.push(pathStr);
            const res = dfs(ny, nx, movesLeft - 1);
            
            if(res !== null) return res;
            
            path.pop();
        }
    }

    
    const map = Array(n + 1).fill().map(() => Array(m + 1).fill(0));
    const dir = [
        [1,0, 'd'], // d
        [0,-1, 'l'], // l
        [0, 1, 'r'], // r
        [-1, 0, 'u'] // u
    ];
    const path = [];
    
    map[x][y] = "S";
    map[r][c] = "E";
    
    const answer = dfs(x, y, k) || "impossible";
    
    return answer;
}