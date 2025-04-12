function solution(a, edges) {
    const SIZE = a.length;
    let graph = Array.from({ length: SIZE }, () => []);
    let visited = Array(SIZE).fill(false);
    let res = BigInt(0);

    const total = a.reduce((sum, val) => sum + val, 0);
    if (total !== 0) return -1;

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let st = [[0, -1]]; // 현재, 부모 노드
    let order = [];
    
    while(st.length > 0) {
        const [cur, parent] = st.pop();
        
        if(visited[cur]) continue;
        
        visited[cur] = true;
        order.push([cur, parent]);
        
        for(const neighbor of graph[cur]) {
            if(visited[neighbor]) continue;
            
            st.push([neighbor, cur]);
        }
    }
    
    while(order.length > 0) {
        const [child, parent] = order.pop();
        
        if(parent === -1) continue;
        
        a[parent] += a[child];
        res += BigInt(Math.abs(a[child]));
    }
    
    return res;
}
