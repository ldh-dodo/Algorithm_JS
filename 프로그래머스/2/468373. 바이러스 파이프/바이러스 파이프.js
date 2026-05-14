function solution(n, infection, edges, k) {
    const graph = Array.from({length : n + 1}, () => []); // [[next, type], ...]
    
    for(const [st, end, type] of edges) {
        graph[st].push([end, type]);
        graph[end].push([st, type]);
    }

    const infected = Array(n + 1).fill(false);
    infected[infection] = true;
    
    let answer = 1;

    function openType(type) {
        const newly = [];
        const queue = [];
        
        for(let i = 1; i <= n; i++) {
            if(infected[i]) queue.push(i);
        }
        
        let head = 0;
        while(head < queue.length) {
            const cur = queue[head++];
            for(const [next, nt] of graph[cur]) {
                if(nt !== type) continue;
                if(infected[next]) continue;
                
                infected[next] = true;
                newly.push(next);
                queue.push(next);
            }
        }
        
        return newly;
    }
    
    function rollback(newly) {
        for(const node of newly) infected[node] = false;
    }
    
    function dfs(depth, count, prevType) {
        if(count > answer) answer = count;
        if(depth === k) return;
        
        for(let type = 1; type <= 3; type++) {
            if(type === prevType) continue;
            const newly = openType(type);
            dfs(depth + 1, count + newly.length, type);
            rollback(newly);
        }
    }
    
    dfs(0, 1, 0);
    return answer;
}