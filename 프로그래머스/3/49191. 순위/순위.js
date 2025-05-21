function solution(n, results) {
    /*
    1 ~ n 번 권투 선수
    권투는 1 대 1
    실력이 좋다면 반드시 이김
    
    경기 결과가 분실되었고, 정확하게 순위를 매길 수 있는 선수의 수를 반환
    
    특정 노드에서 출발해서 목표 노드까지 도달할 수 있는 경우가 n - 1 이라면, 결과를 도출할 수 있음
    */
    
    let floyd = new Array(n + 1).fill().map(() => new Array(n + 1).fill(false));
    let checked = new Array(n + 1).fill(0);
    
    for(const [u, v] of results) {
        floyd[u][v] = true;
    }

    for(let k = 1; k <= n; k++) {
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                if(floyd[i][k] && floyd[k][j]) floyd[i][j] = true;
            }
        }
    }
    
   for(let i = 1; i <= n; i++) {
       for(let j = 1; j <= n; j++) {
           if(floyd[i][j]) {
               checked[i] += 1;
               checked[j] += 1;
           }
        }
   }
    
    return checked.reduce((acc, cur) => (cur === n - 1 ? acc + 1 : acc), 0);
}