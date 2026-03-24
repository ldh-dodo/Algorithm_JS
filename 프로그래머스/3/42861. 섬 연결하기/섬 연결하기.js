function solution(n, costs) {
    /*
     n개 섬(1 ~ 100), 섬을 연결하는 다리 비용(costs)
     최소의 비용으로 모든 섬이 서로 통행 가능하도록 만든다.
    */
    
    function findSet(u) {
        while(u !== p[u]) u = p[u] = p[p[u]];
        return u;
    }
    
    function union(u, v) {
        const uRoot = findSet(u);
        const vRoot = findSet(v);
        
        if(uRoot === vRoot) return false;
        if(rank[uRoot] < rank[vRoot]) p[uRoot] = vRoot;
        else {
            p[vRoot] = uRoot;
            if(rank[uRoot] === rank[vRoot]) {
                rank[uRoot]++;
            }
        }
        
        return true;
    }
    
    const rank = Array(n + 1);
    const p = Array(n + 1);
    
    // make-set
    for(let i = 1; i <= n; i++) {
        p[i] = i;
        rank[i] = 0;
    }
    
    costs.sort((a, b) => a[2] - b[2]);
    let answer = 0;
    
    for(const [u, v, cost] of costs) {
        if(union(u, v)) answer += cost;
    }
    
    return answer;
}