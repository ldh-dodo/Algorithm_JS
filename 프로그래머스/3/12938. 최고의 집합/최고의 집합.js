function solution(n, s) {
    if(s / n < 1) return [-1];
    let remain = s % n;
    
    let answer = Array.from({length : n}, () => Math.floor(s / n));
    
    while(remain > 0) {
        answer[answer.length - remain] += 1;
        remain--;
    }
    
    return answer;
}