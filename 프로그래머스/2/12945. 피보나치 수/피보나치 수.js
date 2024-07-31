const DIVNUM = 1234567;

function solution(n) {
    var answer = 0;
    
    
    let f = [Number(0), Number(1)];
    
    for(let i = 2; i<=n; i++) {
        f[i] = (f[i-2] + f[i-1]) % DIVNUM;
    }
    answer = f[n];
    return answer;
}