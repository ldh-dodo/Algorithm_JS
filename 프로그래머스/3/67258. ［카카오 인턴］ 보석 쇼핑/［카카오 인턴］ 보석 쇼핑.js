function solution(gems) {    
    const set = new Set(gems);
    const map = new Map();
    
    const targetSize = set.size;
    let left = 0;
    let minLength = gems.length + 1;
    let answer = [null, null];
    
    for(let right = 0; right < gems.length; right++){
        map.set(gems[right], (map.get(gems[right]) || 0) + 1);
        
        while(map.size === targetSize){ // 오른쪽으로 영역 확장
            if(right - left + 1 < minLength){
                minLength = right - left + 1;
                answer = [left+1, right+1];
            }
            // 확장된 오른쪽 영역을 왼쪽에서부터 줄여나가면서, 더 좁은 범위 탐색
            
            map.set(gems[left], map.get(gems[left]) - 1);
            if(map.get(gems[left]) === 0){
                map.delete(gems[left]);
            }
            left++;
        }
    }
    
    return answer;
}