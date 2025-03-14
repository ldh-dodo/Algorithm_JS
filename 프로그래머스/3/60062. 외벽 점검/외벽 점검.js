function solution(n, weak, dist) { 
    const weakLen = weak.length;
    const linearWeak = Array(weakLen * 2 - 1);
    
    for(let i = 0; i < linearWeak.length; i++) {
        linearWeak[i] = i < weakLen ? weak[i] : weak[i - weakLen] + n;
    }
    
    dist.sort((a,b) => b - a);
    
    for(let i = 1; i <= dist.length; i++) {
        const permutations = getPermutations(dist, i);
        
        for(const perm of permutations) {
            for(let j = 0; j < weakLen; j++) {
                let weakSequence = linearWeak.slice(j, weakLen + j);
                
                for(const p of perm) {
                    const coverage = weakSequence[0] + p;
                    
                    weakSequence = weakSequence.filter((el) => el > coverage);
                    if(weakSequence.length === 0) return i;
                }
            }
            
        }
    }
     
    function getPermutations(arr, numToSelect) {
        if(numToSelect === 1) return arr.map((el) => [el]);
        
        const res = [];
        
        arr.forEach((number, idx, origin) => {
            const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
            const permutations = getPermutations(rest, numToSelect - 1);
            const combined = permutations.map((el) => [number, ...el]);
            res.push(...combined);
        });
        
        return res;
    }
    
    return -1;
}