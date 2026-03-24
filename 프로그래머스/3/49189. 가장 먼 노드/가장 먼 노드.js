function solution(n, edge) {
    /*
    노드: 1 ~ n 
    
    return: 1번 노드에서 가장 멀리 떨어진 노드의 갯수
    가장 멀리 떨어진 노드: 최단 경로로 이동했을 때, 간선의 개수가 가장 많은 노드
    
    각 노드마다 가중치 1이라 BFS로 가능하다고 판단
    */
    const graph = Array.from({length : n + 1}, () => []);
    const dist = Array(n + 1).fill(null);
    const visited = Array(n + 1).fill(false);
    
    for(const [u, v] of edge) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    const q = [1];
    visited[1] = true;
    dist[1] = 0;
    
    let head = 0;
    
    while(head < q.length) {
        const cur = q[head++];
        
        for(const next of graph[cur]) {
            if(visited[next]) continue;
            
            q.push(next);
            dist[next] = dist[cur] + 1;
            visited[next] = true;
        } 
    }
    
    const max = Math.max(...dist);
    
    return dist.filter((d) => d === max).length;
}