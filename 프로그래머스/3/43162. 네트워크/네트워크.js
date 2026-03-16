function solution(n, computers) {
    let answer = 0;
    const visited = Array(n).fill(false);
    
    
    for(let i = 0; i < n; i++) {
        if(visited[i]) continue;
            
        answer++;
        const q = [i];
        visited[i] = true;
        
        let head = 0;
        while(head < q.length) {
            const cur = q[head++];
            
            computers[cur].forEach((isConnected, node) => {
                if(!visited[node] && isConnected === 1) {
                    visited[node] = true;
                    q.push(node);
                }
            });
        }
        
    }
    
    return answer;
}

