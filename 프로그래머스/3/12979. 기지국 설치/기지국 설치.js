function solution(n, stations, w) {
    /*
    기지국을 최소로 설치하면서, 모든 아파트에 전파를 전달해야 함
    범위 : [station - W, station + W]
    
    전략
    - 각 기지국의 왼쪽 범위를 계산하고, 마지막 기지국은 오른쪽까지 추가로 계산
    
    기지국 범위 : 2 * W + 1
    
    (1, 6) -> 6 - 1 + 1 -> Math.floor(6 / range) = 2
    
    9 - W -> 9 - 2 = 7
    9 + W -> 9 + 2 = 11
    */
    let answer = 0;
    let left = 1;
    const range = 2 * w + 1;
    
    // (left, station - W - 1)
    for(const station of stations) {
        if(station === 1) {
            left = station + w + 1;
            continue;
        }
        
        const right = station - w - 1;
        const dist = right - left + 1;

        
        answer += Math.ceil(dist / range);
        left = station + w + 1;
    }
    
    if(left <= n) { // 남은 오른쪽 처리 (left, n);
        const right = n;
        const dist = right - left + 1;

        answer += Math.ceil(dist / range);
    }
    
    return answer;
}