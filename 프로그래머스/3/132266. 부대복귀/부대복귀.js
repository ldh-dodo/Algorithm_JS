function solution(n, roads, sources, destination) {
    let answer = [];
    const graph = new Array(n + 1).fill().map(() => []);
    let memo = new Array(n + 1).fill(-1);
    
    for(const [u, v] of roads) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    let q = [destination];
    memo[destination] = 0;
    
    while(q.length > 0) {
        const cur = q.shift();
        
        for(const next of graph[cur]) {
            if(memo[next] !== -1) continue;
            
            memo[next] = memo[cur] + 1;
            q.push(next);
        }
    }
    
    for(const source of sources) {
        answer.push(memo[source]);
    }
    
    return answer;
}