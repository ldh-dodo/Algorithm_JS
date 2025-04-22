function solution(n, lighthouse) {
    let graph = Array.from({length : n + 1}, () => []);
    let lighted = Array.from({length : n + 1}, () => false);
    let visited = Array.from({length : n + 1}, () => false);
    let cnt = 0;
    
    for(const [u, v] of lighthouse) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    let st = [[1, -1]];
    let postOrderPath = [];
    
    while(st.length > 0) {
        const [cur, par] = st.pop();
        postOrderPath.push([cur, par]);
        for(const child of graph[cur]) {
            if(child !== par) st.push([child, cur]);
        }
    }
    
    for(let i = postOrderPath.length - 1; i >= 0; i--) {
        // 리프에서부터. 부모와 자식 둘 다 안켜져 있다면, 부모를 키기. (리프노드를 켜선 안됨)
        
        const [cur, par] = postOrderPath[i];
        visited[cur] = true;
        
        for(const child of graph[cur]) {
            if(visited[child]) continue;
            if(!lighted[child] && !lighted[cur]) {
                lighted[child] = true;
                cnt++;
            }
        }
    }
    
    return cnt;
}