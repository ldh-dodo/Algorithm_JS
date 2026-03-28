function solution(places) {
    /*
    대기실은 5개, 각 대기실은 5 x 5 크기
    
    
    - 응시자들끼리 맨해튼 거리가 2이하로 앉아서는 안됨
    - 파티션으로 막혀있다면, 맨해튼 거리 제약조건 상관없음
    - 맨해튼 거리 : (r1, c1) (r2, c2) |r1 - r2| + |c1 - c2|
        
    P : 응시자가 앉아있는 자리
    O : 빈 테이블
    X : 파티션
    */
    
    /*
    각 대기실 별로 모든 응시자가 거리두기를 지키고 있으면 1을, 그렇지 않다면 0을 담아서 반환 
    
    거리 2 이상일 때
    */
    const N = 5;
    const answer = [];
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];
    
    for(const place of places) {
        const board = place.map((row) => row.split(''));
        
        answer.push(cal(board));
    }

    function cal(board) {
        for(let y = 0; y < N; y++) {
            for(let x = 0; x < N; x++) {
                if(board[y][x] !== 'P') continue;
                
                // 현재 위치가 P이고, 2이내의 거리의 다른 P에 도달할 수 있으면 거리두기 X
                
                const visited = Array.from({length : N}, () => Array(N).fill(false));
                const q = [[y, x, 0]]; // [y, x, dist]
                visited[y][x] = true;
                
                while(q.length) {
                    const [cy, cx, dist] = q.shift();
                    
                    for(let dir = 0; dir < 4; dir++) {
                        const ny = cy + dy[dir];
                        const nx = cx + dx[dir];
                        
                        if(ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
                        if(visited[ny][nx]) continue;
                        if(board[ny][nx] === 'X') continue;
                        if(board[ny][nx] === 'P') return 0;
                        
                        visited[ny][nx] = true;
                        if(dist + 1 < 2) q.push([ny, nx, dist + 1]);
                    }
                }
            }
        }
        return 1;
    }
    
    return answer;
}