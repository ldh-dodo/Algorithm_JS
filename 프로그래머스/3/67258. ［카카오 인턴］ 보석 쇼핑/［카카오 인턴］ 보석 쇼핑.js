function solution(gems) {
    // sliding window
    let answer = [];
    
    let totalType = new Set(gems).size;
    let map = new Map();
    
    let left = 0;
    let right = 0;
    let minRange = Infinity;
    
    while(right < gems.length) {
        const gem = gems[right++];
        const qty = map.get(gem) || 0;
        
        map.set(gem, qty + 1);
        
        while(map.size === totalType) {
            const range = right - left;
            
            if(range < minRange) {
                minRange = range;
                answer = [left + 1, right];
            }
            
            let leftGem = gems[left];
            let leftQty = map.get(leftGem);
            
            if(leftQty > 1) {
                map.set(leftGem, leftQty - 1);
            } else {
                map.delete(leftGem);
            }
            
            left++;
        }
    }
    return answer;
}