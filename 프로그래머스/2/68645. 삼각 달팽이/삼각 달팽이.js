function solution(n) {
    let graph = Array.from({length: n});
    let totalCnt = 0;
    for(let y = 0; y < n; y++) {
        totalCnt += y + 1;
        graph[y] = Array(y + 1).fill(Infinity);
    }

    graph[0][0] = 1;
    const dy = [1, 0, -1]; // 아래 우측 좌상단 우선순위
    const dx = [0, 1, -1];
    
    const q = [[0, 0]];
    let dir = 0;
    
    let y = 0, x = 0;
    
    while(totalCnt > graph[y][x]) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if(ny < 0 || nx < 0 || ny >= n || nx > y || graph[y][x] > graph[ny][nx]) {
            dir = (dir + 1) % 3;
            continue;
        }
        
        graph[ny][nx] = graph[y][x] + 1;
        y = ny;
        x = nx;
    }
    
    return graph.flat();
}