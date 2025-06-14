function solution(a, edges) {
    /*
    각 점에 가중치가 부여된 트리
    트리 모든 점들의 가중치를 0으로 만들어야 함
    불가능하다면 -1을, 가능하다면 최소한의 행동으로 수행하고, 횟수를 반환
    
    풀이 전략
    - 임의의 노드를 루트로 잡고, 해당 노드로 모든 요소를 모았을 때 0이 되어야 함
    - 어떤 노드를 루트로 하던, 이 방식을 사용하면 항상 최소한의 행동을 기록할 수 있음
    - 자식 -> 부모로 넘기는 절대 값이 행동 횟수이며, root를 가장 마지막으로 방문하기 위해 후위 순회 이용
    
    */
    
    const canSolve = a.reduce((acc, cur) => acc + cur, 0) === 0;
    if(!canSolve) return -1;
    
    const st = [[0, -1]] // 자식노드, 부모노드
    const paths = [];
    const neighbor = new Array(a.length).fill().map(() => []);
    const visited = new Array(a.length).fill(false);
    let answer = BigInt(0);
    
    for(const [u, v] of edges) {
        neighbor[u].push(v);
        neighbor[v].push(u);
    }
    
    while(st.length > 0) {
        const [cur, par] = st.pop();
        
        if(visited[cur]) continue;
        
        visited[cur] = true;
        paths.push([cur, par]);
        
        for(const next of neighbor[cur]) {
            if(visited[next]) continue;
            st.push([next, cur]);
        }
    }
    
    while(paths.length > 0) {
        const [cur, par] = paths.pop();

        if(par === -1) continue;
        
        a[par] += a[cur];
        answer += BigInt(Math.abs(a[cur]));
    }
    
    return answer;

}