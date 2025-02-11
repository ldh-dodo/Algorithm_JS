function solution(board, skill) { 
    function makePrefixSumArr() {
        let rLen = board.length;
        let cLen = board[0].length;
        
        let prefixSumArr = Array(rLen).fill(0).map(() => Array(cLen).fill(0));
        
     
        skill.forEach(([type, r1, c1, r2, c2, degree], idx) => {
            if(type === 1) degree = -degree;

            prefixSumArr[r1][c1] += degree;
  
            
            if(r2 + 1 === rLen && c2 + 1 === cLen) return;
            if(r2 + 1 === rLen) {
                prefixSumArr[r1][c2 + 1] += -degree;
                return;
            }
            
            if(c2 + 1 === cLen) {
                prefixSumArr[r2 + 1][c1] += -degree;
                return;
            }
            
            prefixSumArr[r2 + 1][c1] += -degree;
            prefixSumArr[r1][c2 + 1] += -degree;
            prefixSumArr[r2 + 1][c2 + 1] += degree;
        });
        

        
        for(let i = 0; i < prefixSumArr.length; i++) {
            for(let j = 1; j < prefixSumArr.length; j++) {
                prefixSumArr[i][j] += prefixSumArr[i][j - 1];
            }
        }
        
        for(let j = 0; j < prefixSumArr.length; j++) {
            for(let i = 1; i < prefixSumArr.length; i++) {
                prefixSumArr[i][j] += prefixSumArr[i - 1][j];
            }
        }
        
        return prefixSumArr;
    }
    
    let answer = 0;
    
    let prefixSumArr = makePrefixSumArr();
    
    
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
            board[i][j] += prefixSumArr[i][j];
            
            if(board[i][j] > 0) answer++;
        }
    }
    
    return answer;
}