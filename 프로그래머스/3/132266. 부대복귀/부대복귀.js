function solution(n, roads, sources, destination) {
    /*
    지역: 유일한 번호
    지역 이동 시간 : 1
    최단시간에 부대로 복귀
    
    
    return : []
    
    1 : [2, 4]
    2 : [1, 4, 5]
    3 : []
    4 : [1, 2, 5]
    5 : [2, 4]
    */
    
    const dist = Array(n + 1).fill(null);
    const graph = Array.from({length : n + 1}, () => []);
    const answer = [];
    
    for(const [u, v] of roads) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    const q = [destination];
    dist[destination] = 0;
    
    let head = 0;
    while(head < q.length) {
        const cur = q[head++];
        
        for(const next of graph[cur]) {
            if(dist[next] !== null) continue;
            
            dist[next] = dist[cur] + 1;
            q.push(next);
        }
    }
    
    for(const s of sources) {
        answer.push(dist[s] === null ? -1 : dist[s]);
    }
    
    return answer;
}