function solution(n, results) {
    /*
    1 ~ n 번 권투선수
    A 선수 실력 > B 선수 -> A 선수 승리
    
    return : 정확하게 순위를 매길 수 있는 선수의 수
          1  2  3  4  5
    [2]   X  me  X  X  O -> 4
    [5]      X
    */
    
    const graph = Array.from({length : n + 1}, () => Array(n + 1).fill(false));
    const rel = Array(n + 1).fill(0);
    
    for(const [u, v] of results) {
        graph[u][v] = true;
    }
    
    for(let k = 1; k <= n; k++) {
        // i -> k -> j가 존재하는지
        for(let i = 1; i <= n; i++) {
            for(let j = 1; j <= n; j++) {
                if(graph[i][k] && graph[k][j]) {
                    graph[i][j] = true;
                }
            }
        }
    }

    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= n; j++) {
            if(i === j) continue;
            if(!graph[i][j]) continue;
            
            rel[i]++;
            rel[j]++;
        }
    }
    
    return rel.filter((cnt) => cnt >= (n - 1)).length;
}