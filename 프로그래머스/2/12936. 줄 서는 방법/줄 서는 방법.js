function solution(n, k) {
     // n = 3 -> 3! = 6
    
    // [1, 2, 3]
    // [1, 3, 2]
    
    // n! / 3 = 2
    // k / 2  = 2.xx Math.ceil
    
    /*
    [3]
    remain: [1, 2] 2!
    */
    const arr = Array.from({length: n}, (_, idx) => idx + 1);
    const answer = [];
    let fact = 1;
    
    k--;
    
    for(let i = 1; i <= n; i++) fact *= i;
    
    for(let i = n; i > 0; i--) {
        fact /= i;
        const idx = Math.floor(k / fact);
        answer.push(arr[idx]);
        arr.splice(idx, 1);
        k %= fact;
    }
    
    return answer;
}