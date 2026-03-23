function solution(players, m, k) {
    /*
    모든 게임 이용자가 게임을 하기 위해 서버를 최소 몇 번 증설해야하는가
    
    m명 늘어날 때마다 서버 1대 추가
    서버 k 시간동안 운영
    
    
    현재 인원보다 서버 대수 부족하면, 서버를 증설한다.
    서버 증설시, cnt 와 lifeTime을 조절한다.
    
    매 시간마다 lifeTime의 요소를 1씩 줄인다.
    */
    let totalAdded = 0;
    let serverCnt = 0;
    let list = Array(25).fill(0);
    
    let j = 0;
    for(const player of players) {    
        const available = (serverCnt + 1) * m;
  
        if(available <= player) {
            const addedServerCnt = Math.floor(player / m) - serverCnt;
            list[k] = addedServerCnt;
            serverCnt += addedServerCnt;
            totalAdded += addedServerCnt;
        }  
        
        for(let remainTime = 1; remainTime <= k; remainTime++) {
            const cnt = list[remainTime];
            if(remainTime - 1 > 0) {
                list[remainTime - 1] = cnt;
                list[remainTime] = 0;
            } else {
                serverCnt -= list[1];
                list[1] = 0;
                
            }
        }
        j++;
    }
    
    return totalAdded;
}