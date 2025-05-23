function solution(n, s, a, b, fares) {
    /*
    무지는 어피치와 합승이 가능함
    
    두 사람이 모두 귀가하는 데 소요되는 예상 최저 택시요금이 얼마인지 계산
    
    n : 지점 갯수
    s : 출발 지점
    a : a의 도착 지점
    b : b의 도착 지점
    fares [c, d, f] 
        c d 사이 택시 요금이 f원
    */
    
    
    let answer = Infinity;
    let floyd = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));
    
    for(const [u, v, cost] of fares) {
        floyd[u][v] = cost;
        floyd[v][u] = cost;
    }
    
    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= n; j++) {
            if(i === j) floyd[i][j] = 0;
        }
    }
    
    for(let k = 1; k <= n; k++) {
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                if(floyd[i][k] + floyd[j][k] < floyd[i][j]) {
                    floyd[i][j] = floyd[i][k] + floyd[j][k];
                }
            }
        }
    }
    
    for(let k = 1; k <=n; k++) {
        answer = Math.min(answer, floyd[s][k] + floyd[k][a] + floyd[k][b]);
    }
    
    return answer;
}