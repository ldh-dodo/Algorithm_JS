function solution(n, edge) {
    // node : 1-based
    // 1번 노드에서 최단 경로 기준가장 멀리 떨어진 노드의 갯수
        
    let answer = 0;
    let graph = new Array(n + 1).fill().map(() => []);
    let visited = new Array(n + 1).fill(false);
    let q = [];
    
    for(const [u, v] of edge) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    q = [[1, 0]]; // [node, dist];
    visited[1] = true;
    let maxDist = -Infinity;
    
    while(q.length > 0) {
        const [node, dist] = q.shift();

        if(dist > maxDist) {
            maxDist = dist;
            answer = 1;
        } else {
            answer++;
        }
        
        for(const neighbor of graph[node]) {
            if(visited[neighbor]) continue;
            
            visited[neighbor] = true;
            q.push([neighbor, dist + 1]);
        }
    }
    
    return answer;
}