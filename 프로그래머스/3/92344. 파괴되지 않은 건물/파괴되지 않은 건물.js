function solution(board, skill) {
    /*
    각 건물이 내구도를 가짐
    
    공격과 회복은 항상 직사각형
    
    skill
    [type, r1, c1, r2, c2, degree]
    type 1 : 공격 2 : 회복
    
    1. 크기가 1씩 더 큰 부분합 배열을 만든다.
    2. 각 skill마다 부분합 배열의 아래 좌표에 degree 만큼을 더한다.
    (r1, c1) -> degree, (r1, c2 + 1) -> -degree, (r2 + 1, c1) -> -degree, (r2 + 1, c2 + 1) -> degree
    3. 부분합 배열에서 부분합을 구한다.
    4. 테두리를 제외한 부분을 순회하며, 파괴되지 않은 건물의 수를 구한다.
    */
    
    let answer = 0;
    let rLen = board.length;
    let cLen = board[0].length;
    
    let prefixSum = new Array(rLen + 1).fill().map(() => new Array(cLen + 1).fill(0));
    
    for(const [type, r1, c1, r2, c2, degree] of skill) {
        const cost = type === 1 ? -1 * degree : degree;
        
        prefixSum[r1][c1] += cost;
        prefixSum[r1][c2 + 1] += (-cost);
        prefixSum[r2 + 1][c2 + 1] += cost;
        prefixSum[r2 + 1][c1] += (-cost);
    }
    
    // 부분합 계산
    for(let r = 0; r < rLen; r++) {
        for(let c = 1; c < cLen; c++) {
            prefixSum[r][c] += prefixSum[r][c - 1]
        }
    }
    
    for(let c = 0; c < cLen; c++) {
        for(let r = 1; r < rLen; r++) {
            prefixSum[r][c] += prefixSum[r - 1][c];
        }
    }
    
    for(let r = 0; r < rLen; r++) {
        for(let c = 0; c < cLen; c++) {
            board[r][c] += prefixSum[r][c];
            if(board[r][c] > 0) answer++; 
        }
    }

    return answer;
}