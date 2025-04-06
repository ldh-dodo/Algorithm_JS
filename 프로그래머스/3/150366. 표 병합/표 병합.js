function solution(commands) {
    const answer = [];
    const LEN = 2500;
    const cell = Array(LEN).fill(null);
    const p = Array(LEN).fill(0).map((_, i) => i);
    const parseCoord = (r, c) => (parseInt(r) - 1) * 50 + (parseInt(c) - 1);

    for(const command of commands) {
        const com = command.split(' ');
        
        switch(com[0]) {
            case "UPDATE":
                if(com.length === 4) update(parseCoord(com[1], com[2]), com[3]);
                else replace(com[1], com[2]);
                break;
            case "MERGE":
                union(parseCoord(com[1], com[2]), parseCoord(com[3], com[4]));
                break;
            case "UNMERGE":
                unmerge(parseCoord(com[1], com[2]));
                break;
            case "PRINT":
                print(parseCoord(com[1], com[2]));
                break;  
        }
    }
    
    function update(u, value) {
        const parentIdx = findSet(u);
        cell[parentIdx] = value;
    }
    
    function replace(value1, value2) {
        for(let i = 0; i < LEN; i++) {
            if(cell[i] === value1) cell[i] = value2;
        }
    }
    
    
    function unmerge(u) {
        const targetRoot = findSet(u);
        const targetValue = cell[targetRoot];
        const group = [];
        
        for(let i = 0; i < LEN; i++) {
            const curRoot = findSet(i);
            
            if(curRoot === targetRoot) 
                group.push(i);
        }
        
        for(const idx of group) {
            p[idx] = idx;
            cell[idx] = null;
        }
        
        cell[u] = targetValue;
    }
    
    function print(u) {
        answer.push(cell[findSet(u)] ?? "EMPTY");
    }
    
    function findSet(u) {
        if(u !== p[u]) p[u] = findSet(p[u]);
        return p[u];
    }
    
    function union(u, v) {
        const uRoot = findSet(u);
        const vRoot = findSet(v);
        
        if(uRoot === vRoot) return;
        
        if(cell[uRoot] === null && cell[vRoot] !== null) {
            p[uRoot] = vRoot;
        } else {
            p[vRoot] = uRoot;
        }
    }    
        
    return answer;
}