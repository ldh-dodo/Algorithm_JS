function solution(commands) {
    /*
    표 크기 : 50 x 50
    
    - 모든 좌표 값은 이차원이 아닌, 1차원 배열로 변환하여 사용한다.
    - disjoint set 이용
    
    updateCell : 해당 좌표의 root 값을 value로 바꾼다.
    updateValue : 모든 좌표값을 순회하며 해당 값을 가진 좌표를 목표 값으로 바꾼다.
    merge : 같은 set 안에 집어넣는다
    unmerge : 모든 좌표값을 순회하며 해당 좌표의 root값과 같은 root 값을 가지는 좌표들을 초기값으로 초기화
    print : 해당 좌표의 root 값을 출력한다.
    */
    let answer = [];
    const LEN = 50 * 50 + 1;
    const cell = new Array(LEN).fill(null);
    const p = new Array(LEN).fill().map((_, idx) => idx); // makeSet은 해당 구문으로 대체
    
    const parseCoord = (u, v) => {
        [u, v] = [Number(u), Number(v)];
        
        return ((u - 1) * 50) + v;
    }
    
    for(const command of commands) {
        const com = command.split(' ');
        
        switch(com[0]){
            case 'UPDATE' :
                update(com);
                break;
            case 'MERGE' :
                merge(com);
                break;
            case 'UNMERGE' :
                unmerge(com);
                break;
            case 'PRINT' :
                print(com);
                break;
        }
    }
    
    function update(command) {
        if(command[3] !== undefined) updateCell(command);
        else updateValue(command);
    }
    
    function updateCell([, r, c, val]) {
        cell[findSet(parseCoord(r, c))] = val;
    }
    
    function updateValue([, val1, val2]) {
        for(let i = 0; i < LEN; i++) {
            if(cell[i] === val1) cell[i] = val2;
        }
    }
    
    function merge([, r1, c1, r2, c2]) {        
        union(parseCoord(r1, c1), parseCoord(r2, c2));
    }
    
    function unmerge([, r, c]) {
        const curCoord = parseCoord(r, c);
        const root = findSet(curCoord);
        const rollbackItem = cell[root];
        const unmergeGroup = [];
        
        for(let i = 0; i < LEN; i++) {
            if(root === findSet(i)) unmergeGroup.push(i);
        }
        
        for(const idx of unmergeGroup) {
            p[idx] = idx;
            cell[idx] = null;
        }
        
        if(rollbackItem !== null) {
            cell[curCoord] = rollbackItem;
        }
    }
    
    function print([, r, c]) {
        const value = cell[findSet(parseCoord(r, c))];
        
        answer.push(value ?? 'EMPTY');
    }
    
    // disjoint set
    
    function findSet(u) {
        if(p[u] !== u) p[u] = findSet(p[u]);
        
        return p[u];
    }
    
    function union(u, v) {
        const [uRoot, vRoot] = [findSet(u), findSet(v)];
        
        if(uRoot === vRoot) return;
        
        if(cell[vRoot] !== null && cell[uRoot] === null) p[uRoot] = vRoot;
        else p[vRoot] = uRoot;
    }
    
    return answer;
}