function solution(n, wires) {
    /*
    두 전력망이 갖게되는 송전탑의 개수를 최대한 비슷하게 맞춰서 네트워크를 두 개로 분할
    */
    
    const graph = Array.from({length: n + 1}, () => []);
    
    for(const [u, v] of wires) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let minDiff = Infinity;
    for(const [u, v] of wires) {
        const newGraph = [...graph.map((row) => row.map((el) => el))];
        newGraph[u].splice(newGraph[u].indexOf(v), 1);
        newGraph[v].splice(newGraph[v].indexOf(u), 1);
        
        const visited = Array(n + 1).fill(false);
        const diff = [];
        
        for(let i = 1; i <= n; i++) {
            if(visited[i]) continue;
            
            let cnt = 1;
            visited[i] = true;
            const q = [i];

            while(q.length) {
                const cur = q.shift();
                for(const next of newGraph[cur]) {
                    if(visited[next]) continue;
                    
                    cnt++;
                    q.push(next);
                    visited[next] = true;
                }
            }
            
            diff.push(cnt);
        }
        
        minDiff = Math.min(minDiff, Math.abs(diff[0] - diff[1]));
    }
    
    return minDiff;
}