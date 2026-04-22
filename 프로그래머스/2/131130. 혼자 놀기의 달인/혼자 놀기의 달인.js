function solution(cards) {
   /*
   그룹이 하나 -> 0점, 게임 종료
   */ 
    
    const group = [];
    const n = cards.length;
    const visited = Array(n).fill(false);
    
    for(let i = 0; i < cards.length; i++) {
        if(visited[i]) continue;
        
        let cur = i;
        let cnt = 0;
        
        while(!visited[cur]) {            
            visited[cur] = true;
            cur = cards[cur] - 1;
            cnt++;
        }
        
        group.push(cnt);
    }
    
    group.sort((a, b) => b - a);
    
    return group.length < 2 ? 0 : group[0] * group[1];
}