function solution(board, skill) { 
    function makePrefixSumArr() {
        let rLen = board.length;
        let cLen = board[0].length;
        
        let prefixSumArr = Array(rLen + 1).fill(0).map(() => Array(cLen + 1).fill(0));
        
     
        skill.forEach(([type, r1, c1, r2, c2, degree]) => {
            if(type === 1) degree = -degree;
            
            prefixSumArr[r1][c1] += degree;
            prefixSumArr[r1][c2 + 1] -= degree;
            prefixSumArr[r2 + 1][c1] -= degree;
            prefixSumArr[r2 + 1][c2 + 1] += degree;

        });
        
        for(let i = 0; i < rLen + 1; i++) {
            for(let j = 1; j < cLen + 1; j++) {
                prefixSumArr[i][j] += prefixSumArr[i][j - 1];
            }
        }
        
        for(let j = 0; j < cLen + 1; j++) {
            for(let i = 1; i < rLen + 1; i++) {
                prefixSumArr[i][j] += prefixSumArr[i - 1][j];
            }
        }
        
        return prefixSumArr;
    }
    
    let answer = 0;
    
    let prefixSumArr = makePrefixSumArr();
    
    
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            board[i][j] += prefixSumArr[i][j];
            
            if(board[i][j] > 0) answer++;
        }
    }
    
    return answer;
}
