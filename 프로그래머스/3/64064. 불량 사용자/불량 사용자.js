function solution(userIds, bannedIds) {
    let bannedList = new Set();
    
    bannedIds = bannedIds.map((id) => id.replaceAll('*', '.'));
    find(0, new Set());
    
    function find(bannedIdx, list) {
        if(bannedIdx >= bannedIds.length) {
            bannedList.add([...list].sort().join());
        }
        
        for(let i = 0; i < userIds.length; i++) {
            const [bannedId, userId] = [bannedIds[bannedIdx], userIds[i]];
            if(!canInsert(bannedId, userId, list)) continue;
            
            list.add(userId);
            find(bannedIdx + 1, list);
            list.delete(userId);
        }
    }
    
    function canInsert(bannedId, userId, list) {
        const regex = new RegExp(`^${bannedId}$`);
        return !list.has(userId) && regex.test(userId);
    }
    
    return bannedList.size;
}