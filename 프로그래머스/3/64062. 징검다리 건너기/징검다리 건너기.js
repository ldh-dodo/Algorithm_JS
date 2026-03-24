function solution(stones, k) {
    /*
    징검다리 디딤돌에는 모두 숫자가 적혀있다.
    디딤돌을 한 번 밟을 때마다 숫자가 1 줄어든다.
    디딤돌 : 0 -> 밟을 수 없고,
    건너뛰는 지점이 최대 칸수 k 보다 작을 때, 가장 가까운 디딤돌로 건너뛸 수 있다.
    
    건널 수 있는 친구들의 수 : 1 ~ 2억.
    친구 수를 이분 탐색으로 좁히면서, stones의 배열 원소 <= 친구 수 가 k 이상이면 
    건너 뛸 수 없음.
    */
    let left = 1;
    let right = 200000001;
    
    
    while(left < right) {
        const mid = (left + right) >> 1;
        let zeroCnt = 0;
        
        for(const stone of stones) {
            if(stone <= mid) {
                zeroCnt++;
            } else zeroCnt = 0;
            
            if(zeroCnt >= k) {
                right = mid;
                break;
            }
        }
        
        if(right !== mid) left = mid + 1;
    }
    
    return left;
}