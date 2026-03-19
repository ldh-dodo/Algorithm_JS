function solution(maps) {
    /*
        이동 가능 : 통로(통로에 레버 가능), 문(선행조건 : 레버 당기기)
        이동 불가능 : 벽
        
        출발 지점 -> 레버 지점 -> 문
        
        미로 빠져나가는 최소시간
        
        S: 시작지점
        E: 출구
        L : 레버
        O : 통로
        X : 벽
        
    */
    
    let time = 0;
    const n = maps.length;
    const m = maps[0].length;
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];
    
    let [y, x] = [-1, -1];
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(maps[i][j] === 'S') [y, x] = [i, j];
        }
    }
    
    let visited = Array.from({length : n}, () => Array(m).fill(false));
    visited[y][x] = true;
    let q = [[y, x, 0]]; // [y, x, dist]
    let flag = false;
        
    while(q.length) { // L까지 이동
        if(flag) break;
        
        const [cy, cx, dist] = q.shift();
        
        for(let dir = 0; dir < 4; dir++) {
            const ny = cy + dy[dir];
            const nx = cx + dx[dir];
            
            if(ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
            if(visited[ny][nx]) continue;
            if(maps[ny][nx] === 'X') continue;
            
            if(maps[ny][nx] === 'L') {
                y = ny;
                x = nx;
                time = dist + 1;
                flag = true;
                break;
            }
            
            q.push([ny, nx, dist + 1]);
            visited[ny][nx] = true;
        }
    }
    
    if(!flag) return -1;
    
    visited = Array.from({length : n}, () => Array(m).fill(false));
    visited[y][x] = true;
    q = [[y, x, 0]];
    flag = false;
    
    while(q.length) { // E까지 이동        
        const [cy, cx, dist] = q.shift();
        if(flag) break;
        
        
        for(let dir = 0; dir < 4; dir++) {
            const ny = cy + dy[dir];
            const nx = cx + dx[dir];
            
            if(ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
            if(visited[ny][nx]) continue;
            if(maps[ny][nx] === 'X') continue;
            
            if(maps[ny][nx] === 'E') {
                time += dist + 1;
                flag = true;
                break;
            }
            
            q.push([ny, nx, dist + 1]);
            visited[ny][nx] = true;
        }
    }
    
    if(!flag) return -1;
    return time;
}