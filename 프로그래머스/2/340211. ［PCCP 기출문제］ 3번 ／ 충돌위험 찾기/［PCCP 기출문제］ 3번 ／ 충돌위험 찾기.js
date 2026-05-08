function solution(points, routes) {
    /*
    2차원 좌표로 나타낼 수 있는 n개의 포인트 존재(1 ~ n)
    로봇마다 정해진 운송 경로(m)가 존재
    로봇은 x대
    1초마다 상하좌우 한 군데로 이동 가능
    다음 포인트로 이동할 때는 항상 최단경로. y축 이동 우선
    
    위험상황 : 같은 좌표에 2대 이상 로봇이 존재하는 상황(여러 대가 한 군데에 있어도 1번)
    return : 위험 상황이 총 몇 번 일어나는지
    points: 운송 포인트 n개의 좌표 배열
    routes : 로봇 x대의 운송 경로를 담은 배열
    routes[0] 은 (0+1), 1번째 로봇의 운송 경로
    
    로봇의 이동에 걸리는 시간은 최대 200초로 잡는다.
    n, r, c, x, m <= 100
    */
    
    // routes 내부 포인트를 points의 인덱스로 변경
    routes = routes.map((route) => route.map((p) => p - 1));
    
    let maxTime = -1;
    let answer = 0;
    
    const x = routes.length;
    const positions = []; // positions[x][t] 는 x로봇의 t 시점의 위치
    
    const getPath = (cy, cx, ey, ex) => {
        const path = [];
        
        while(cy !== ey) {
            if(cy > ey) cy--;
            else cy++;
            
            path.push([cy, cx]);
        }
        
        while(cx !== ex) {
            if(cx > ex) cx--;
            else cx++;
            
            path.push([cy, cx]);
        }
        
        return path;
    }
    
    for(const route of routes) {
        const [sy, sx] = points[route[0]];
        const path = [[sy, sx]];
        
        for(let i = 1; i < route.length; i++) {
            const [y1, x1] = points[route[i-1]];
            const [y2, x2] = points[route[i]];
            
            path.push(...getPath(y1, x1, y2, x2));
        }
        
        maxTime = Math.max(maxTime, path.length-1);
        positions.push(path);
    }
    
    // 각 시간마다, 로봇의 좌표를 저장해두자.
    // 0초        1초        2초        3초
    // (1, 4) -> (2, 4) -> (3, 4) -> (4, 4)
    // [[1,4], [2,4], [3,4], [4,4]]
    // (3, 2) -> (4, 2) -> (4, 3) -> (4, 4)
    
    for(let t = 0; t <= maxTime; t++) {
        const counter = new Map();
        
        for(const pos of positions) {
            if(t >= pos.length) continue;
            
            const [r, c] = pos[t];
            
            const key = `${r},${c}`;
            
            counter.set(key, (counter.get(key) || 0) + 1);    
        }
        
        for(const [key, value] of counter) {
            if(value >= 2) answer++;
        }
    }
    
    return answer;
}