function solution(maps) {
    // 0은 벽 1은 통로
    // maps[n-1][m-1]이 목표
    
    /* 
    BFS 재귀 함수를 이용해서 효율성 테스트를 통과하지 못한 관계로,
    BFS로 구현
    */
    
    let n = maps.length;
    let m = maps[0].length;
    const visited = new Array(n).fill(false).map(()=> new Array(m).fill(false));
    
    const queue = [[0,0,1]];
    visited[0][0] = true;
    
    var answer = 0;
    
    const directed = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    
    while(queue.length > 0){ // 큐가 빌 때 까지 반복
        let [y, x, count] = queue.shift();
        
        for(const [dy, dx] of directed){ // 방향을 더해주면서 검사
            let [ny, nx] = [y+dy, x+dx];
            
            if(!(ny >= 0 && ny < n && nx >= 0 && nx < m)) continue; // y,x 범위내에 있어야함
            if(visited[ny][nx]) continue; // 방문한적 없어야 함
            if(maps[ny][nx] === 0) continue; // 벽이 아니어야 함
            
            queue.push([ny, nx, count+1]);
            visited[ny][nx] = true;
            
            if(ny === n-1 && nx === m-1) {
               return count+1;
            }
        }
    }
    return -1;
}