function solution(userId, bannedId) {
    let answer = 0;
    const result = new Set();    
    
    function backtracking(n) {
        const path = new Set();
        
        function dfs(bannedIdx) {
            if(path.size === n) {
                result.add([...path].sort().join(','));
                return;
            }
            
            for(let i = 0; i < userId.length; i++) {
                const uid = userId[i];
                const bid = bannedId[bannedIdx];
                
                if(path.has(uid)) continue;
                if(!canBan(uid, bid)) continue;
                
                path.add(uid);
                dfs(bannedIdx + 1);
                path.delete(uid);
            }
        }    
        
        dfs(0);
        
    }
    
    function canBan(uid, bid) {
        if(uid.length !== bid.length) return false;
        
        for(let i = 0; i < bid.length; i++) {
            if(bid[i] === '*') continue;
            if(uid[i] !== bid[i]) return false;
        }
        
        return true;
    }
    
    backtracking(bannedId.length);
    
    return result.size;
}                            