function solution(key, lock) {
    /*
    자물쇠 N x N
    열쇠 M x M
    열쇠는 회전, 이동 가능
    자물쇠 영역을 벗어난 부분에 있는 열쇠의 홈과 돌기는 영향을 주지 않음
    M <= N
    0 : 홈
    1 : 돌기
    
    풀이 전략
    Lock의 기존 크기가 N x N 이라면, 3N x 3N 크기의 새로운 Lock을 만들어서 Key의 가장자리부터 대조가능하도록 크기를 설정
    
    key의 우측 하단좌표가 Lock의 우측 상단 좌표와 겹치게 시작
    
    1. rotate(네 방향) 하며 unlock 가능한지 비교
    2. 안되면 다음 좌표 이동
    3. key의 우측 상단좌표가 Lock의 우측 하한 좌표와 겹칠 때까지만 반복
    
    네 방향의 Key와 Lock을 전부 대조해보면서 열 수 있는지 확인한다.
    
    
    */
    let N = lock.length;
    let M = key.length;
    
    let newLock = new Array(3 * N).fill().map(() => new Array(3 * N).fill(-1));
    
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            newLock[i + N][j + N] = lock[i][j];
        }
    }
    
    for(let k = 0; k < 4; k++) {
        key = rotate(key);
        
        for(let i = 0; i <= 2 * N; i++) {
            for(let j = 0; j <= 2 * N; j++) {
                if(canUnlock(i, j)) return true;
            }
        }
    }

    function canUnlock(r, c) {
        let tempLock = newLock.map((row) => [...row]);
                                   
        for(let i = 0; i < M; i++) {
            for(let j = 0; j < M; j++) {
                const [y, x] = [i + r, j + c];
                
                if(y >= 3 * N || x  >= 3 * N) continue;           
                tempLock[y][x] += key[i][j];
            }
        }
        
        for(let i = N; i < 2 * N; i++) {
            for(let j = N; j < 2 * N; j++) {
                if(tempLock[i][j] !== 1) return false;
            }
        }
        
        return true;
    }
    
    function rotate(key) { 
        let newKey = new Array(M).fill().map(() => new Array(M).fill(0));
        
        for(let i = 0; i < M; i++) {
            for(let j = 0; j < M; j++) {
                newKey[j][M - i - 1] = key[i][j];  
            }
        }
        
        return newKey;
    }
    
    return false;
}