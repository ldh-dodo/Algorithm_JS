function solution(gems) {
    /*
    모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간
    -> 구간이 여러개면 시작 진열대 번호가 가장 작은 구간
    
    return [시작 진열대 번호, 끝 진열대 번호]
    */
    const gemSet = new Set(gems);
    const gemMap = new Map();
    
    let left = 0, right = 0;
    let answer = [0, gems.length];
    
    gemMap.set(gems[0], 1);
    
    while(left < gems.length && right < gems.length) {
        const isAll = gemMap.size === gemSet.size;
        
        if(isAll) {
            if(answer[1] - answer[0] > right - left) answer = [left + 1, right + 1];
            
            left++;
            const prevGem = gems[left - 1];
            const prevCnt = gemMap.get(prevGem);
            
            if(prevCnt - 1 === 0) gemMap.delete(prevGem);
            else gemMap.set(prevGem, prevCnt - 1);
        } else {
            right++;
            
            if(right >= gems.length) break;
            const nextGem = gems[right];
            const nextCnt = gemMap.get(nextGem) || 0;
            
            gemMap.set(nextGem, nextCnt + 1);
        }
    }
    
    return answer;
}