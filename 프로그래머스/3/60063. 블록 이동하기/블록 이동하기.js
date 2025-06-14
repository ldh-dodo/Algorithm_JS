function solution(board) {
    /*
    - 로봇은 2 x 1 크기
    - 지도는 N x N 크기
    - 좌표는 (1, 1) ~ (N, N)
    - 0 : 빈칸, 1 : 벽
    - 로봇은 벽에 막히지 않는다면 회전이 가능함
    
    
    목표
    - 로봇이 차지하는 두 칸 중 어느 한 칸이라도 (N,N)에 도착하도록 하는 최소 시간을 구하라.
    
    제한 사항
    - 초기 로봇은 (1,1) (1,2)에 놓여있고, 반드시 빈칸임
    - 로봇은 반드시 목적지에 도착할 수 있음
    - 5 <= N <= 100
    
    로봇이 이동 가능한 경우
    
    미방문 지역이어야 함(회전 포함)
    회전 X
    - 가로로 놓인 경우
        - 오른쪽 이동 -> 우측 좌표 오른쪽 좌표가 0
        - 왼쪽 이동 -> 좌측 좌표 왼쪽 좌표가 0
        - 상단 이동 -> 상단 두 좌표가 0
        - 하단 이동 -> 하단 두 좌표가 0
    - 세로로 놓인 경우
        - 오른쪽 이동 -> 우측 두 좌표가 0
        - 왼쪽 이동 -> 좌측 두 좌표가 0
        - 상단 이동 -> 상단 좌표 위쪽 좌표가 0
        - 하단 이동 -> 하단 좌표 아래쪽 좌표가 0
    
    회전 O
    - 가로로 놓인 경우
        - 왼쪽을 축으로 아래로 회전 -> 하단 두 좌표가 0
        - 왼쪽을 축으로 위로 회전 > 상단 두 좌표가 0
        - 오른쪽을 축으로 아래로 회전 -> 하단 두 좌표가 0
        - 오른쪽을 축으로 위로 회전 -> 상단 두 좌표가 0
    - 세로로 놓인 경우
        - 위쪽을 축으로 오른쪽 회전 -> 우측 두 좌표가 0
        - 위쪽을 축으로 왼쪽 회전 -> 좌측 두 좌표가 0
        - 아래쪽을 축으로 오른쪽 회전 -> 우측 두 좌표가 0
        - 아래쪽을 축으로 왼쪽 회전 -> 좌측 두 좌표가 0
        
    필요한 변수
    - 현재 로봇 좌표 기억 (0, 0) ~ (N - 1, N - 1)
    - 로봇이 어떤 방향으로 놓여있는가(가로, 세로)
    - 방문 체크 배열(가로, 세로 방향)
    
    */   
    const N = board.length;
    const visited = new Array(N).fill().map(() => 
                                            new Array(N).fill().map(() => 
                                                                    new Array(2).fill(false)));
    const dy = [-1, 1, 0, 0]; // 상, 하, 좌, 우
    const dx = [0, 0, -1, 1];
    
    const q = [[0, 0, 0, 1, 0, 0]];
    // [ay, ax, by, bx, dir, dist]
    // dir 0 : 가로, 1 : 세로
    
    while(q.length > 0) {
        const [ay, ax, by, bx, dir, dist] = q.shift();
        
        if(((ay === (N - 1) && ax === (N - 1)) || (by === (N - 1) && bx === (N - 1))))
            return dist;
        
        if(visited[ay][ax][dir]) continue;
        visited[ay][ax][dir] = true;
        
        let nay, nax, nby, nbx;
        let [canGoUp, canGoDown, canGoLeft, canGoRight] = [false, false, false, false];
        
        if(dir === 0) { // 현재 방향 가로
            /*
                회전 X
                - 오른쪽 이동 -> 우측 좌표 오른쪽 좌표가 0
                - 왼쪽 이동 -> 좌측 좌표 왼쪽 좌표가 0
                - 상단 이동 -> 상단 두 좌표가 0
                - 하단 이동 -> 하단 두 좌표가 0
            */
            for(let i = 0; i < 4; i++) {
                [nay, nax, nby, nbx] = [ay + dy[i], ax + dx[i], by + dy[i], bx + dx[i]];
                
                if(!isValid(nay, nax, nby, nbx)) continue;
                
                if(i === 0) canGoUp = true; // 상
                else if(i === 1) canGoDown = true; // 하
                
                q.push([nay, nax, nby, nbx, 0, dist + 1]);
            }
            
            // 회전 O
            
            if(canGoDown) {
            // - 왼쪽을 축으로 아래로 회전 -> 하단 두 좌표가 0    
                [nay, nax, nby, nbx] = [ay, ax, ay+1, ax];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 1, dist+1]);
            // - 오른쪽을 축으로 아래로 회전 -> 하단 두 좌표가 0
                [nay, nax, nby, nbx] = [by, bx, by+1, bx];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 1, dist+1]);
            }
            
            if(canGoUp) {
            // - 왼쪽을 축으로 위로 회전 > 상단 두 좌표가 0    
                [nay, nax, nby, nbx] = [ay-1, ax, ay, ax];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 1, dist+1]);
            // - 오른쪽을 축으로 위로 회전 -> 상단 두 좌표가 0
                [nay, nax, nby, nbx] = [by-1, bx, by, bx];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 1, dist+1]);
            }    
        } else { // 현재 방향 세로
            /*
                회전 X
                - 오른쪽 이동 -> 우측 두 좌표가 0
                - 왼쪽 이동 -> 좌측 두 좌표가 0
                - 상단 이동 -> 상단 좌표 위쪽 좌표가 0
                - 하단 이동 -> 하단 좌표 아래쪽 좌표가 0    
            */
            for(let i = 0; i < 4; i++) {
                [nay, nax, nby, nbx] = [ay + dy[i], ax + dx[i], by + dy[i], bx + dx[i]];
                
                if(!isValid(nay, nax, nby, nbx)) continue;
                
                if(i === 2) canGoLeft = true; // 좌
                else if(i === 3) canGoRight = true; // 우
                
                q.push([nay, nax, nby, nbx, 1, dist + 1]);
            }
            
            // 회전 O
            
            if(canGoLeft) {
                // - 위쪽을 축으로 왼쪽 회전 -> 좌측 두 좌표가 0
                [nay, nax, nby, nbx] = [ay, ax-1, ay, ax];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 0, dist+1]);
                // - 아래쪽을 축으로 왼쪽 회전 -> 좌측 두 좌표가 0
                [nay, nax, nby, nbx] = [by, bx-1, by, bx];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 0, dist+1]);
            }
            
            if(canGoRight) {
                // - 위쪽을 축으로 오른쪽 회전 -> 우측 두 좌표가 0
                [nay, nax, nby, nbx] = [ay, ax, ay, ax+1];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 0, dist+1]);
                // - 아래쪽을 축으로 오른쪽 회전 -> 우측 두 좌표가 0
                [nay, nax, nby, nbx] = [by, bx, by, bx+1];
                if(isValid(nay, nax, nby, nbx)) q.push([nay, nax, nby, nbx, 0, dist+1]);
            }
        }
    }
    
    function isValid(ay, ax, by, bx) {
        if(!(ay >= 0 && by >= 0 && ax >= 0 && bx >= 0)) return false;
        if(!(ay < N && by < N && ax < N && bx < N)) return false;
        if(!(board[ay][ax] === 0 && board[by][bx] === 0)) return false;
        
        return true;
    }
}