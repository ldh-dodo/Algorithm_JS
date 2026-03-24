function solution(data, col, rowBegin, rowEnd) {
    /*
    data: [[prKey, ]]
    
    column : [prKey]
    
    rowBegin <= i <= rowEnd인 모든 S_i를 누적하여 XOR 한 값을 해시 값으로 반환
    
    */
    
    data.sort((a, b) => a[col - 1] - b[col - 1] || b[0] - a[0]);

    let answer = -1;
    
    for(let y = rowBegin - 1; y <= rowEnd - 1; y++) {
        let remain = 0;
        
        for(const num of data[y]) {
            remain += num % (y + 1);
        }
        
        if(answer === -1) answer = remain;
        else {
            answer ^= remain;
        }
    }
    
    return answer;
}