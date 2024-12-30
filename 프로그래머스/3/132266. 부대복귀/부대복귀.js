function solution(n, roads, sources, destination) {
    let answer = [];
    
    len = n + 1;
    
    let graph = Array(len).fill().map(() => []);
    
    for(let i = 0; i < roads.length; i++) {
        let [start, end] = roads[i];
        
        graph[start].push(end);
        graph[end].push(start);
    }
    
    
    const bfs = (start) => {
        let q = [start];
        let dist = Array(len).fill(-1);
        
        const isValid = (source) => dist[source] === -1;
        
        dist[start] = 0;
        
 
        while(q.length > 0) {
            const curPos = q.shift();
            
            graph[curPos].forEach((nextPos) => {
                if(!isValid(nextPos)) return;
                
                q.push(nextPos);
                dist[nextPos] = dist[curPos] + 1;
            });
        }
        
        return dist;
    }
    
    const DestToSource = bfs(destination);
    
    console.log(DestToSource);
    
    sources.forEach((source) => {
        answer.push(DestToSource[source]);
    })
    
    return answer;
}