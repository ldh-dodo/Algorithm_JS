function solution(n, costs) {
    let answer = 0;
    let p = new Array(n);
    let rank = new Array(n);
    let edgeCnt = 0;
    
    makeSet();

    costs.sort((a,b) => a[2] - b[2]);
    
    for(const [u, v, cost] of costs) {
        if(findSet(u) === findSet(v)) continue;
        
        union(u, v);
        edgeCnt++;
        answer += cost;
        
        if(edgeCnt === n - 1) break;
    }
    
    function makeSet() {
        for(let i = 0; i < n; i++) {
            p[i] = i;
            rank[i] = 0;
        }
    }
    
    function findSet(u) {
        if(p[u] !== u) {
            p[u] = findSet(p[u]);
        }
        
        return p[u];
    }

    function union(u, v) {
        const uRoot = findSet(u);
        const vRoot = findSet(v);
        
        if(rank[uRoot] > rank[vRoot]) {
            p[vRoot] = uRoot;
        } else {
            p[uRoot] = vRoot;
            if(rank[uRoot] === rank[vRoot]) {
                rank[vRoot] += 1;
            }
        }
    }
    
    
    return answer;
}