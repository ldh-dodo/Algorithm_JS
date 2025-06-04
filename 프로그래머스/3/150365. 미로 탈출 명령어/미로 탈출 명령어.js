function solution(n, m, x, y, targetX, targetY, targetDist) {
    /*
    격자 : n x m
    목표 : (x, y) -> (r, c) 이동
    
    조건
    1. 벽 바깥으로는 못나감
    2. 탈출했을 때, 거리가 k여야 함.
    3. 같은 격자를 두 번 이상 방문해도 됨
    4. 탈출 경로를 문자열로 나타냈을 때, 사전순으로 가장 빠른 경로로 탈출
    5. 경로가 존재하지 않을 수 있음
    
    
    d, l, r, u 순으로 다음 이동 경로를 추적한다.
    현재 거리 > k 라면 탐색 중지
    현재 거리 = k 라면, 현재 위치가 목적지인지 확인 후, 그렇다면 바로 문자열로 반환한다.
    
    
    */
    
    let answer = '';
    
    let dx = [1, 0, 0, -1];
    let dy = [0, -1, 1, 0];
    let pStr = ['d', 'l', 'r', 'u'];
    const path = [];
    
    const res = dfs(x, y, targetDist) || 'impossible';
    
    return res;
    
    function dfs(curX, curY, movesLeft) {
        if(movesLeft === 0) {
            if(curX === targetX && curY === targetY) return path.join('');
            else return null;
        }
        
        if(!canReach(curX, curY, movesLeft)) return null;
        
        for(let i = 0; i < 4; i++) {
            const [nx, ny] = [curX + dx[i], curY + dy[i]];
            
            if(ny <= 0 || nx <= 0 || ny > m || nx > n) continue;
            
            path.push(pStr[i]);
            const res = dfs(nx, ny, movesLeft - 1);
            
            if(res !== null) return res;
            path.pop();
        }
        
    }
    
    function canReach(curX, curY, movesLeft) {
        // 도달가능한지 판별법
        // 남은 거리가 남은 이동 수보다 크면 도달 불가능
        // 남은 거리가 남은 이동 수보다 작으면, 두 개를 뺀 값이 0포함 짝수여야, 되돌아와도 도착할 수 있음
        const remainDist = Math.abs(curY - targetY) + Math.abs(curX - targetX);
        
        if(remainDist > movesLeft) return false;
        if(Math.abs(remainDist - movesLeft) % 2 !== 0) return false;
        
        return true;
    }
}