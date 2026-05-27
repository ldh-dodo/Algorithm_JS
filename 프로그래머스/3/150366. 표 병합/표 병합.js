function solution(commands) {
    // disjoint set을 사용해야함. flat 하게 표현
    const LEN = 50 * 50 + 1;
    const table = Array(LEN).fill(null);
    const p = Array(LEN);

    const answer = [];
    
    for(let i = 0; i < LEN; i++) {
        p[i] = i;
    }
    
    const parseCoord = (r, c) => 50 * (Number(r) - 1) + Number(c);
    
    for(const str of commands) {
        const strArr = str.split(' ');
        const command = strArr[0];
        const params = strArr.slice(1);
        
        if(command === 'UPDATE') {
            if(params.length === 3) {
                // (r, c)가 부모로 삼는 위치의 셀의 값을 value로 변경
                const [r, c, value] = params;
                table[find(parseCoord(r, c))] = value;
            } else {
                // 표 전체를 순회하며 val1 값을 가지는 셀을 val2로 변경
                const [val1, val2] = params;
                
                for(let i = 0; i < LEN; i++) {
                    if(find(i) === i && table[i] === val1) table[i] = val2;
                }
            }
        } else if(command === 'MERGE') {
            // 같은 셀이라면 명령 무시
            // (r1, c1) 값이 없고 (r2, c2) 값이 있다면 (r2, c2)가 (r1, c1)의 부모
            // 이 외는 (r1, c1)가 (r2, c2)의 부모
            const [r1, c1, r2, c2] = params;
            
            union(parseCoord(r1, c1), parseCoord(r2, c2));
        } else if(command === 'UNMERGE') {
            // (r, c)의 부모를 찾고, 테이블 전체를 순회하며 같은 부모를 가지는 셀의 부모를
            // 자기 자신으로 되돌린다.
            
            // (r, c)만 병합 전 값을 가지고, 나머지는 초기값(null) 로 되돌린다.
            const [r, c] = params;
            
            const u = parseCoord(r, c);
            const root = find(u);
            const rollbackData = table[root];
            
            const group = [];
            
            for(let i = 0; i < LEN; i++) {
                if(find(i) === root) group.push(i);
            }
            
            for(const u of group) {
                p[u] = u;
                table[u] = null;
            }
            
            table[u] = rollbackData;
        } else if(command === 'PRINT') {
            // (r, c)의 부모를 찾고, 부모 셀의 값을 출력한다.
            // 비어있다면 'EMPTY를 출력한다.'
            
            const [r, c] = params;
            
            const value = table[find(parseCoord(r, c))];
            answer.push(value ?? "EMPTY");
        }
        
    }

    function find(u) {
        while(u !== p[u]) u = p[u] = p[p[u]];
        return u;
    }
    
    function union(u, v) {
        const uRoot = find(u);
        const vRoot = find(v);
        
        if(uRoot === vRoot) return;
    
        if(!table[uRoot] && table[vRoot]) {
            // v가 u의 부모
            p[uRoot] = vRoot;
        } else {
            // u가 v의 부모
            p[vRoot] = uRoot;
        }
    }
    
    return answer;
}