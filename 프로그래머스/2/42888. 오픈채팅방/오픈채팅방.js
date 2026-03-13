function solution(record) {
    const nickname = {}; // {uid: nickname}
    
    const newRecord = record.map((line) => line.split(' ')); // [op, uid, currentNickname]
    
    for(const [op, uid, curName] of newRecord) {
        if(op === 'Enter' || op === 'Change') {
            nickname[uid] = curName;
        }
    }
    
    const log = [];
    
    for(const [op, uid, _] of newRecord) {
        if(op === 'Enter') {
            log.push(`${nickname[uid]}님이 들어왔습니다.`);
        } else if(op === 'Leave') {
            log.push(`${nickname[uid]}님이 나갔습니다.`);
        }
    }
    
    return log;
}