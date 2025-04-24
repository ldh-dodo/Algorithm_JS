function solution(n, computers) {
    let graph = Array.from({length : n}, () => []);
    let visited = Array.from({length : n}, () => false);
    let cnt = 0;
    
    computers.forEach((computer, i) => {
        computer.forEach((target, j) => {
            if(i === j || target === 0) return;
        
            graph[i].push(j);
        });
    });
    
    for(let i = 0; i < n; i++) {
        if(visited[i]) continue;
        
        cnt++;
        let q = [i];
        visited[i] = true;
        
        while(q.length > 0) {
            const cur = q.shift();
            
            for(const next of graph[cur]) {
                if(visited[next]) continue;
                
                visited[next] = true;
                q.push(next);
            }
        }
    }
    
    return cnt;
}