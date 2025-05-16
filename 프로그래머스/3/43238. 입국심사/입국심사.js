function solution(n, times) {
    // 입국심사를 기다리는 사람과, 걸리는 시간의 범위가 크니, 이분탐색을 이용하자
    // 이분 탐색 대상 : 총 걸리는 시간
    
    // 가장 최적의 시간에 모든 사람이 심사를 마치기 위한 조건
    // 몫의 합이 n과 같아야 함
    
    let answer = 0;
    let left = 1;
    let right = 1000000000 * times.length;
    
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        let pCnt = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);
        
        if(pCnt >= n) right = mid - 1;
        else left = mid + 1;
    }
    
    return left;
}