function solution(matrixSizes) {
    /*
    [A, B] [B, C] 의 연산 횟수 : A x B x C
    */
    function divideAndConquerMemo(st, end) {
        if(memo[st][end] === null) {
            memo[st][end] = divideAndConquer(st, end);
        }
        
        return memo[st][end];
    }
    
    function divideAndConquer(st, end) {
        if(end - st === 1) return 0;
        
        let minOpCnt = Infinity;
        
        for(let mid = st + 1; mid < end; mid++) {
            const leftOpCnt = divideAndConquerMemo(st, mid);
            const rightOpCnt = divideAndConquerMemo(mid, end);
            const curOpCnt = matrixSizes[st][0] * matrixSizes[mid][0] * matrixSizes[end - 1][1];
            
            minOpCnt = Math.min(minOpCnt, (leftOpCnt + rightOpCnt + curOpCnt));
        }
        
        return minOpCnt;
    }
    
    const LEN = matrixSizes.length;
    const memo = new Array(LEN + 1).fill().map(() => new Array(LEN + 1).fill(null));

    return divideAndConquer(0, LEN);
}