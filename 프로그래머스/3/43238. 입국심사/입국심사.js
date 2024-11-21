function solution(n, times) {
    /*
    기능 정리
    1. n명이 입국심사를 하고, 각 입국심사대의 심사관의 심사 시간은 다를 수 있다.
    2. 한 심사대에서 한 명만 심사할 수 있다.
    3. 처음에 모든 심사대는 비어있다.
    4. 가장 앞에 서있는 사람은 비어있는 심사대로 가거나, 더 빨리 끝나는 심사대로 간다.
    5. 모든 사람이 심사를 받는데 걸리는 시간의 최솟값을 구하라
    
    입력 요구사항
    1. 입국 심사를 기다리는 사람은 1명 이상 10억명 이하이다.
    2. 심사관의 심사 시간은 1분 이상 10억분 이하이다.
    3. 심사관은 1명 이상 10만명 이하이다.
    */
    
    let left = 1;
    let right = Math.max(...times) * n;
    
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        let totalPeopleCnt = times.reduce((acc, time) => 
                                         acc + Math.floor(mid / time), 0);
        
        if(totalPeopleCnt < n) {
            left = mid + 1;
            continue;
        }
        right = mid - 1;
    }
    return left;
}