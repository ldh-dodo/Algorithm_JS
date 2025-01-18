function solution(n, s, a, b, fares) {
    let answer = 0;
    
    let floydArr = Array(n + 1).fill().map(() => Array(n + 1).fill(Infinity));
    
    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= n; j++) {
            if(i === j) floydArr[i][j] = 0;
        }
    }
    
    fares.forEach(([depart, dest, cost]) => {
        floydArr[depart][dest] = cost;
        floydArr[dest][depart] = cost;
    })
    
    for(let k = 1; k <= n; k++) {
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                floydArr[i][j] = Math.min(floydArr[i][j], 
                                          floydArr[i][k] + floydArr[k][j]);
            }
        }
    }
    answer = floydArr[s][a] + floydArr[s][b]; // 처음엔 합승하지 않은 금액으로 초기화
    
    for(let k = 1; k <= n; k++) {
        // 경유지 거쳤을 때 최솟값 갱신
        
        answer = Math.min(
            answer, 
            floydArr[s][k] + floydArr[k][a] + floydArr[k][b]
        );
    }
    
    return answer;
}