function solution(playTime, advTime, logs) {
    /*
        1. 시청자들이 가장 많이 보는 구간에 공익광고 삽입
        2. 광고는 원래 영상과 동시에 재생되는 PIP 형태로 제공
        
        playTime : 전체 동영상 재생시간 길이
        advTime : 공익광고 재생시간 길이
        logs : 시청자들이 해당 동영상을 재생했던 구간 정보
        
        누적 시청자수가 가장 많은 구간을 구하자.        
    */
    function parseMinutes(time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    function parseTimeFormat(minutes) {
        let h = Math.floor(minutes / 3600);
        let m = Math.floor(minutes % 3600 / 60);
        let s = minutes % 60;
        
        h = h.toString().padStart(2, '0');
        m = m.toString().padStart(2, '0');
        s = s.toString().padStart(2, '0');
        
        return `${h}:${m}:${s}`;
    }
    
    playTime = parseMinutes(playTime);
    advTime = parseMinutes(advTime);
    
    const dp = Array(playTime + 1).fill(0);
    
    logs.forEach((log) => {
        const [sTime, eTime] = log.split('-');
        dp[parseMinutes(sTime)]++;
        dp[parseMinutes(eTime)]--;
    });
    
    for(let i = 1; i <= playTime; i++) {
        dp[i] += dp[i - 1];
    }
    for(let i = 1; i <= playTime; i++) {
        dp[i] += dp[i - 1];
    }
    
    let maxViewers = dp[advTime - 1]; // 0초 ~ advTime - 1 초 구간 시청자부터 체크
    let answer = 0; // 처음 시작 시간으로 초기화
    
    for(let i = advTime - 1; i <= playTime; i++) {
        const curTime = i - advTime + 1;
        const prefixSum = dp[i] - dp[curTime - 1];
        if(prefixSum > maxViewers) {
            maxViewers = prefixSum;
            answer = curTime;
        }
    }
    
    return parseTimeFormat(answer);
}