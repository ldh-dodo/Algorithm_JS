const dy = [-1, 1, 0, 0] // 상, 하 , 좌, 우
const dx = [0, 0, -1, 1];

class Pos {
    constructor(ay, ax, by, bx, dir, dist) {
        this.ay = ay;
        this.ax = ax;
        this.by = by;
        this.bx = bx;
        this.dir = dir;
        this.dist = dist;
    }
}

function solution(board) {
    /*        
        board
        N x N 크기. 0 : 빈칸 1 : 벽
        
        visited
        0 : 가로, 1 : 세로
    */
    
    board = board.map((row) => row.map((item) => item === 0 ? true : false));

    const SIZE = board.length;
    const q = [new Pos(0, 0, 0, 1, 0, 0)];
    const visited = Array.from({length : SIZE }, () => Array(SIZE).fill(0).map(() => [false, false]));
    const answer = [];
    
    visited[0][0][0] = true;
    
    // bfs, visited

    /*
        1. 현재 가로
            1. 상 [ay - 1, ax] [by - 1, bx] 가 1
            2. 하 [ay + 1, ax] [by + 1, bx] 가 1
            3. 좌 [ay, ax - 1] 가 1
            4. 우 [by, bx + 1] 가 1
            5. [ay, ax] 축으로 아래 회전 : 2번 조건 
            6. [ay, ax] 축으로 위 회전 : 1번
            7. [by, bx] 축으로 아래 회전 : 2번
            8. [by, bx] 축으로 위 회전 : 1번 
            
        2. 현재 세로
            /*
            1. 상 [ay - 1, ax] 가 1
            2. 하 [by + 1, bx] 가 1
            3. 좌 [ay, ax - 1] [by, bx - 1] 가 1
            4. 우 [ay, ax + 1] [by, bx + 1] 가 1
            5. [ay, ax] 축으로 왼쪽 회전 : 3번
            6. [ay, ax] 축으로 오른쪽 회전 : 4번
            7. [by, bx] 축으로 왼쪽 회전 : 3번
            8. [by, bx] 축으로 오른쪽 회전 : 4번
    */
    while(q.length > 0) {
        const cur = q.shift();
        if((cur.ay === (SIZE - 1) && cur.ax === (SIZE - 1)) 
           || (cur.by === (SIZE - 1) && cur.bx === (SIZE - 1))) return cur.dist;
        
        let nAy, nAx, nBy, nBx;
        let [canGoUp, canGoDown, canGoLeft, canGoRight] = [false, false, false, false];
        
        if(cur.dir === 0) { // 가로
            for(let i = 0; i < 4; i++) { // 상, 하, 좌, 우
                nAy = cur.ay + dy[i];
                nAx = cur.ax + dx[i];
                nBy = cur.by + dy[i];
                nBx = cur.bx + dx[i];
                
                if(!isValid(nAy, nAx, nBy, nBx)) continue;

                    
                if(i === 0) { // 상
                    canGoUp = true
                } else if(i === 1) { // 하
                    canGoDown = true;
                } 
                
                if(visited[nAy][nAx][0]) continue;
                q.push(new Pos(nAy, nAx, nBy, nBx, 0, cur.dist + 1));  
                visited[nAy][nAx][0] = true;
            }
            
            //  [ay, ax] 축으로 아래 회전 : 아래 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.ay, cur.ax, cur.ay + 1, cur.ax];
            if(canGoDown && !visited[nAy][nAx][1]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 1, cur.dist + 1));  
                visited[nAy][nAx][1] = true;
            }
            

            //  [ay, ax] 축으로 위 회전 : 위 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.ay - 1, cur.ax, cur.ay, cur.ax];
            if(canGoUp && !visited[nAy][nAx][1]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 1, cur.dist + 1));  
                visited[nAy][nAx][1] = true;
            }
            
            // [by, bx] 축으로 아래 회전 : 아래 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.by, cur.bx, cur.by + 1, cur.bx];
            if(canGoDown && !visited[nAy][nAx][1]){
              q.push(new Pos(nAy, nAx, nBy, nBx, 1, cur.dist + 1));
              visited[nAy][nAx][1] = true;
            } 
            
            // [by, bx] 축으로 위 회전 : 위 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.by - 1, cur.bx, cur.by, cur.bx];
            if(canGoUp && !visited[nAy][nAx][1]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 1, cur.dist + 1));
                visited[nAy][nAx][1] = true;
            }
            
        } else if(cur.dir === 1) { // 세로
            for(let i = 0; i < 4; i++) { // 상, 하, 좌, 우
                nAy = cur.ay + dy[i];
                nAx = cur.ax + dx[i];
                nBy = cur.by + dy[i];
                nBx = cur.bx + dx[i];
 
                if(!isValid(nAy, nAx, nBy, nBx)) continue;

                
                if(i === 2) { // 좌
                    canGoLeft = true
                } else if(i === 3) { // 우
                    canGoRight = true;
                } 
                
                if(visited[nAy][nAx][1]) continue;
                q.push(new Pos(nAy, nAx, nBy, nBx, 1, cur.dist + 1));  
                visited[nAy][nAx][1] = true;
            }
            
            //  [ay, ax] 축으로 왼쪽 회전 : 왼쪽 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.ay, cur.ax - 1, cur.ay, cur.ax];
            if(canGoLeft && !visited[nAy][nAx][0]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 0, cur.dist + 1));  
                visited[nAy][nAx][0] = true;
            }
            
            //  [ay, ax] 축으로 오른쪽 회전 : 오른쪽 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.ay, cur.ax, cur.ay, cur.ax + 1];
            if(canGoRight && !visited[nAy][nAx][0]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 0, cur.dist + 1));  
                visited[nAy][nAx][0] = true;
            }
            
            // [by, bx] 축으로 왼쪽 회전 : 왼쪽 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.by, cur.bx - 1, cur.by, cur.bx];
            if(canGoLeft && !visited[nAy][nAx][0]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 0, cur.dist + 1));  
                visited[nAy][nAx][0] = true;
            }
            
            //  [by, bx] 축으로 오른쪽 회전 : 오른쪽 이동 가능, 방문 여부
            [nAy, nAx, nBy, nBx] = [cur.by, cur.bx, cur.by, cur.bx + 1];
            if(canGoRight && !visited[nAy][nAx][0]) {
                q.push(new Pos(nAy, nAx, nBy, nBx, 0, cur.dist + 1));  
                visited[nAy][nAx][0] = true;
            }
        }
    }
    
    function isValid(ay, ax, by, bx) {
        return ((ay >= 0 && ax >= 0 && by >= 0 && bx >=0) 
                && (ay < SIZE && ax < SIZE && by < SIZE && bx < SIZE)
                && (board[ay][ax] && board[by][bx]));
    }
    // 6번 테스트만 틀림. 어떤걸 놓쳤나?
    // canGo 변수들은 단순히 이동만 검사하는 것으로, 방문 여부를 검사하기 전에 체크함으로써 해결
}
