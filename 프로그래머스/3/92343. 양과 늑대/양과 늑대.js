function solution(info, edges) {
/*
    0: 양
    1: 늑대
    
    edges : [부노 노드 번호, 자식 노드 번호]
*/
    let ans = 0;
    const graph = Array(info.length).fill().map(() => []);
    const q = [0];
    const sheepCnt = Array(info.length).fill(0);
    
    sheepCnt[0] = 1;
    
    edges.forEach(([p, c]) => {
        graph[p].push(c);
    });
    
    dfs(0, [0], 0, 0);
    
    function dfs(cur, nextNodes, sheeps, wolfs) {
        if(info[cur] === 0) sheeps++;
        else wolfs++;
        
        if(sheeps <= wolfs) return;
        
        ans = Math.max(ans, sheeps);
        nextNodes.push(...graph[cur]);
        nextNodes = nextNodes.filter((item) => item !== cur);
        
        nextNodes.forEach((next) => {
            let localNext = [...nextNodes];
            dfs(next, localNext, sheeps, wolfs)
        })
    }
    
    return ans;
}