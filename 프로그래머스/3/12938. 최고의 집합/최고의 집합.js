function solution(n, s) {
    let answer = [];
    
    /*
    s / n = quotient
    s % n = remainder
    
    n - remainder 만큼 quotient를 채우고
    remiander 개수 만큼 quotient + 1을 채우기
    */
    
    let quotient, remainder;
    
    quotient  = Math.floor(s / n);
    remainder = s % n;
    
    if(quotient === 0){
        return [-1];
    }
    
    for(let i = 0; i < n - remainder; i++){
        answer.push(quotient);
    }
    for(let i = 0; i < remainder; i++){
        answer.push(quotient+1);
    }
    
    return answer;
}