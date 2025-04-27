function solution(n, stations, w) {
    let answer = 0;
    let left = 1;

    for(let i = 0; i < stations.length; i++) {
        if(left > n) break;
        // 각 stations의 왼쪽개수만 처리
        // left ~ cur - W - 1 인덱스까지 처리.
        // 이후 left <- cur + W + 1
        
        const cur = stations[i];
        const right = cur - w - 1;
        const cnt = right - left + 1;
        
        answer += Math.ceil(cnt / (2 * w + 1));
        left = cur + w + 1;
    }
    
    // 마지막 stations의 오른쪽 처리
    if(left <= n) {
        answer += Math.ceil((n - left + 1) / (2 * w + 1));
    }
    
    return answer;
}