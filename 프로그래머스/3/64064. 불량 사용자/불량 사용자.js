function isMatch(userStr, bannedStr){
    let replaceBannedStr = bannedStr.replace(/\*/g, '.');
    const regex = new RegExp('^' + replaceBannedStr + '$');
    return regex.test(userStr);    
}

function solution(user_id, banned_id) {
    let bannedList = new Set();
    
    function findBannedList(bannedIdx, selected){
        if(bannedIdx === banned_id.length){
            const sortedList = [...selected].sort().join(',');
            bannedList.add(sortedList);
            return;
        }
        
        for(let i = 0; i < user_id.length; i++){
            let checkValidity = !selected.has(user_id[i]) && 
                isMatch(user_id[i], banned_id[bannedIdx]);
            if(checkValidity){
                selected.add(user_id[i]);
                findBannedList(bannedIdx + 1, selected);
                selected.delete(user_id[i]);
            }
        }
    }
    
    findBannedList(0, new Set());
    
    return bannedList.size;
}