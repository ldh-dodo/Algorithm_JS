function solution(a) {    
    if(a.length <= 2) return 0;
    
    const counts = {};
    
    for(const num of a) {
        counts[num] = (counts[num] || 0) + 1;
    }
    
    let maxLength = 0;

    
    for(const key in counts) {
        if(counts[key] * 2 < maxLength) continue;
        
        let pairCnt = 0;
        const keyNum = Number(key);
        
        for(let i = 0; i < a.length - 1; i++) {
            const hasKey = a[i] === keyNum || a[i + 1] === keyNum;
            const adjacentNotEqual = a[i] !==  a[i+1];
            
            if(hasKey && adjacentNotEqual) {
                pairCnt++;
                i++;
            }
        }
        maxLength = Math.max(pairCnt * 2, maxLength);
    }
    
    return maxLength;
}