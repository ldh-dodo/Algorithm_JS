function solution(key, lock) {
    const keyLen = key.length;
    const lockLen = lock.length;
    const searchMapLen = lockLen * 3;
    let searchMap = Array(searchMapLen).fill(0).map(() => Array(searchMapLen).fill(0));
    const minSearchRange = lockLen - keyLen + 1;
    const maxSearchRange = 2 * lockLen + keyLen - 2;
    
    function rotate(target) {
        const N = target.length;
        let rotated = Array(N).fill(0).map(() => Array(N).fill(0));
        
        for(let i = 0; i < N; i++) {
            for(let j = 0; j < N; j++){
                rotated[j][N - i - 1] = target[i][j];
            }
        }
        
        return rotated;
    }
    
    function canUnlock(searchMap, key, x, y) {
        let tempMap = searchMap.map((row) => [...row]);
        
        for(let i = 0; i < keyLen; i++) {
            for(let j = 0; j < keyLen; j++) {
                if (x + i >= searchMapLen || y + j >= searchMapLen) continue;
                tempMap[x + i][y + j] += key[i][j];
            }
        }
        
        for(let i = lockLen; i < 2 * lockLen; i++) {
            for(let j = lockLen; j < 2 * lockLen; j++) {
                if(tempMap[i][j] !== 1) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    for (let i = 0; i < lockLen; i++) {
        for (let j = 0; j < lockLen; j++) {
            searchMap[i + lockLen][j + lockLen] = lock[i][j];
        }
    }
    
    for(let k = 0; k < 4; k++) {
        key = rotate(key);
        
        for(let i = minSearchRange; i <= maxSearchRange; i++) {
            for(let j = minSearchRange; j <= maxSearchRange; j++) {
                if(canUnlock(searchMap, key, i, j)){
                    return true;
                }
            }
        }
    }
   
    return false;
}

