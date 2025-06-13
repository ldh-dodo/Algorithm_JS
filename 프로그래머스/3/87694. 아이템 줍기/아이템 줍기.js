function solution(rectangle, cX, cY, itemX, itemY) {
    /*
    - 두 직사각형이 꼭짓점에서 만나거나 변이 겹치는 경우는 없음
    - 다각형이 여러 개의 지형으로 분리되어 있는 경우는 없음
    - 한 직사각형이 다른 직사각형 안에 완전히 포함되는 경우는 없음
    
    캐릭터가 아이템을 줍기 위해 이동해야 하는 가장 짧은 거리를 반환
    
    rectangle
    [좌하단 x, 좌하단 y, 우상단 x, 우상단 y]
    
    [cX, cY] 는 초기 캐릭터 위치
    [itemX, itemY] 목표 위치
    
    모든 좌표값은 1이상 50이하인 자연수
        
    풀이 전략
    - 경계를 따라 이동하는지 판별하기 위해서, 모든 좌표 값을 두 배로 늘려 경계 -> 경계로 건너 뛰는 경우를 방지한다.
    
    - 이차원 배열을 통해 갈 수 있는 지형인지 판별한다.
    - 초기화 되어있지 않은 지형은 0으로 갈 수 있는 지형은 1로 다른 사각형의 내부는 2로 표시한다.
    
    기존 값이 0일 때
        - 경계 값은 1로 초기화한다.
        - 경계 값이 아닌 값(내부) 는 2로 초기화 한다.
    기존 값이 1일때
        - 경계 값은 1로 그대로 둔다.
        - 내부 값은 2로 변경한다.
    기존 값이 2일 때
        - 들어오는 값에 상관없이 2로 초기화한다.
    */
    let answer = 0;
    let arr = new Array(102).fill().map(() => new Array(102).fill(0));
    let visited = new Array(102).fill().map(() => new Array(102).fill(false));
    let dy = [-1, 1, 0, 0], dx = [0, 0, -1, 1];
    
    rectangle = rectangle.map(([x1, y1, x2, y2]) => [x1*2, y1*2, x2*2, y2*2]);
    [cX, cY, itemX, itemY] = [cX*2, cY*2, itemX*2, itemY*2];
    
    for(const [x1, y1, x2, y2] of rectangle) {
        for(let y = y1; y <= y2; y++) {
            for(let x = x1; x <= x2; x++) {
                if((y === y1 || y === y2 || x === x1 || x === x2) &&
                  arr[y][x] !== 2) { // 경계값이고 내부가 아니라면 1로 초기화
                    arr[y][x] = 1;
                } else {
                    arr[y][x] = 2;
                }
            }
        }
    }
    
    const q = [[cY, cX, 0]];
    
    while(q.length > 0) {
        const [y, x, dist] = q.shift();
        if(y === itemY && x === itemX) return dist / 2;
        if(visited[y][x]) continue;
        
        visited[y][x] = true;
        
        for(let i = 0; i < 4; i++) {
            let [ny, nx] = [y + dy[i], x + dx[i]];
            if(ny <= 0 || nx <= 0 || ny >= arr.length || nx >= arr.length) continue;
            if(arr[ny][nx] !== 1) continue;
            
            q.push([ny, nx, dist + 1]);
        }
    }
    
    
    
    return answer;
}