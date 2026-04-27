function solution(play_time, adv_time, logs) {
    /*
    시청자들이 가장 많이 보는 구간에 공익 광고
    광고는 원래 영상과 동시에 재생됨(PIP)
    
    시간 -> 초로 변환, 누적합 이용.
    누적합이 가장 큰 재생 구간의 재생 시간 반환.

    */
    
    function timeToSec(time) {
        const [hour, minute, sec] = time.split(':').map(Number);
        
        return hour * 3600 + minute * 60 + sec;
    }
    
    
    const playSec = timeToSec(play_time);
    const advSec = timeToSec(adv_time);
    
    const prefixSum = Array(playSec + 1).fill(0);
    
    for(const log of logs) {
        const [sSec, eSec] = log.split('-').map(timeToSec);
        prefixSum[sSec]++;
        prefixSum[eSec]--;
    }
    
    for(let i = 1; i < prefixSum.length; i++) prefixSum[i] += prefixSum[i-1];
    for(let i = 1; i < prefixSum.length; i++) prefixSum[i] += prefixSum[i-1];
    
    
    let max = prefixSum[advSec-1];
    let answerTime = 0;
    
    for(let i = advSec; i <= playSec; i++) {
        const cur = i - advSec + 1;
        const time = prefixSum[i] - prefixSum[cur-1];
        
        if(time > max) {
            max = time;
            answerTime = cur;
        }
    }
    
    const secToTimes = (sec) => {
        return [
            Math.floor(sec / 3600),
            Math.floor((sec % 3600) / 60),
            sec % 60
        ]
        .map((el) => String(el).padStart(2, '0'))
        .join(':');
    }
    
    return secToTimes(answerTime);
}