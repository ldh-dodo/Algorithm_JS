function solution(info, edges) {
    /*
        edges = [부모 노드, 자식 노드]
        양의 수 > 늑대
        
        양이 늑대에게 잡아먹히지 않도록 하면서, 최대한 많은 수의 양을 모아서 루트 노드로 돌아와야 함
        
        풀이 전략 고민
        만약 중간에 늑대로 인해 가지 못한 길이라도, 나중에는 가야할 수 있음.
        이에 대한 분기처리를 어떻게 해야할까?
        
        자신을 제외한 다음 방문 노드를 기억하고, 계속 계승하면서 방문 노드를 완전 탐색하는 방식으로 해줘야함
        info의 길이가 매우 제한적이므로, 충분히 가능할 듯
        
    */
    let answer = 0;
    const LEN = info.length;
    const graph = new Array(LEN).fill().map(() => []);
    
    for(const [u, v] of edges) {
        graph[u].push(v);
    }
    
    dfs(0, [0], 0, 0);
    
    function dfs(cur, nextNodes, sheepCnt, wolfCnt) {
        if(info[cur] === 0) sheepCnt++;
        else wolfCnt++;
        
        if(sheepCnt <= wolfCnt) return;
        
        answer = Math.max(answer, sheepCnt);
        nextNodes = nextNodes.filter((el) => cur !== el);
        nextNodes.push(...graph[cur]);
        
        for(const nextNode of nextNodes) {
            dfs(nextNode, [...nextNodes], sheepCnt, wolfCnt);
        }
    }
    
    return answer;
}