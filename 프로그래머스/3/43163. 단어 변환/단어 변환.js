function solution(begin, target, words) {
    words.push(begin);
    const SIZE = words.length;
    let graph = Array.from({length : SIZE }, () => []);
    let [beginIdx, targetIdx] = [SIZE - 1, null];
    let visited = Array.from({length : SIZE }, () => false);
    
    if(!words.some((word) => word === target)) return 0;
    
    for(let i = 0; i < SIZE; i++) {
        const cur = words[i];
        if(cur === target) targetIdx = i;
        
        for(let j = 0; j < SIZE; j++) {
            if(i === j) continue;
            
            const next = words[j];
            let cnt = 0;
            
            for(let k = 0; k < cur.length; k++) {
                if(cnt > 1) break;
                
                if(cur[k] !== next[k]) cnt++;
            }
            
            if(cnt === 1) graph[i].push(j);
        }
    }

     let q = [[beginIdx, 0]];
   
     visited[beginIdx] = true;

    while(q.length > 0) {
        const [curIdx, cnt] = q.shift();
        visited[curIdx] = true;
        
        if(curIdx === targetIdx) return cnt;
        
        for(const nextIdx of graph[curIdx]) {
            if(visited[nextIdx]) continue;
            
            q.push([nextIdx, cnt + 1]);
        }
    }
}