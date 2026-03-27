function solution(n, times) {
    /*
    n, t 최대 10억
    O(logN) 이어야 통과 가능 -> 이분 탐색 가능성
    
    28 / 7 -> 4
    28 / 10 -> 2.xx 
    
    몫 더했을 때 n, lowerbound

    */
    
    let left = 1;
    let right = n * Math.max(...times) + 1
    
    while(left < right) {
        const mid = Math.floor((left + right) / 2);
        
        let sum = times.map((time) => Math.floor(mid / time))
                        .reduce((acc, cur) => acc + cur, 0);
        
        if(sum >= n) right = mid;
        else left = mid + 1;
    }
    
    return left;
}