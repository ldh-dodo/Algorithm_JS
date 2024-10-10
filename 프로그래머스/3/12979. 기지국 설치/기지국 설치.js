function solution(n, stations, w) {
    let answer = 0;

    // N이 2억. 따라서 2억개의 배열로 방문검사를 하기에는 힘들어보임
    // station 오름차순
    // 각 기지국의 왼쪽 전부 처리하고, 나머지 마지막 기지국의 오른쪽 처리하기
    
    let cur_pos = 1;
    let w_range = 2 * w + 1;
    
    // 왼쪽처리
    for(let i = 0; i < stations.length; i++){
        let left = stations[i] - w;
        
        if(cur_pos < left){
            answer += Math.ceil((left - cur_pos)/ w_range);
        }
        
        cur_pos = stations[i] + w + 1;
    }
    
    // 마지막 st의 오른쪽 처리
    
    if(cur_pos <= n){
        answer += Math.ceil((n-cur_pos + 1) / w_range);
    }
    
    return answer;
}