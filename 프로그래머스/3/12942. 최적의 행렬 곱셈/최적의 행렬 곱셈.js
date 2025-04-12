function solution(matrixSizes) { 
    function divideAndConquer(s, e) {
        if(e - s === 1) return 0;
        
        let answer = Infinity;
        
        for(let m = s + 1; m < e; m++) {
            let leftOpCnt = divideAndConquerMemo(s, m);
            let rightOpCnt = divideAndConquerMemo(m, e);
            let curOpCnt = matrixSizes[s][0] * matrixSizes[m][0] * matrixSizes[e - 1][1];
            
            answer = Math.min(answer, leftOpCnt + rightOpCnt + curOpCnt);
        }
        
        return answer;
    }
        
    function divideAndConquerMemo(s, e) {
        if(memo[s][e] === null) 
            memo[s][e] = divideAndConquer(s, e);
        
        return memo[s][e];
    }
    
    const SIZE = matrixSizes.length;
    let memo = Array.from({length : SIZE + 1}, () => Array.from({length : SIZE + 1}, () => null));
    
    return divideAndConquer(0, SIZE);
}