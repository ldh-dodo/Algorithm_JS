function solution(playTime, advTime, logs) {
    /*
    시청자들이 가장 많이 보는 구간에 공익광고를 삽입
    광고는 원래 영상과 동시에 재생되는 형태로 제공
    
    playTime : 동영상 재생 시간(HH:MM:SS)
    advTime : 공익광고 재생시간(HH:MM:SS)
    
    logs : 시청자들이 동영상의 어떤 구간을 재생했는지에 대한 재생구간 기록
    (H1:M1:S1-H2:M2:S2)
    
    누적 재생 시간이 가장 많기 위해서는 광고를 삽입했을 때 총 시청 시간이 최대가 되어야함
    
    해결 전략
    1. 모든 시간을 초로 변환한다.
    2. playTime 크기만큼의 배열을 만들고, 시청자 수 누적합 계산
        누적합을 계산할 때, 시작 지점을 1로, 종료지점보다 1초 클 때 -1로 설정하고, 한 번에 계산한다.
        
    3. 시청자 수가 가장 많았던 시작 지점을 구한다.
    
    
    
    */
    
    const timeToSeconds = (time) => {
        const [hour, minutes, seconds] = time.split(':');
        
        return Number(hour) * 3600 + Number(minutes) * 60 + Number(seconds);
    }
    
    const secondsToTimes = (seconds) => {
        let [h, m, s] = [
            Math.floor(seconds / 3600),
            Math.floor((seconds % 3600) / 60),
            seconds % 60,
        ].map(String);
        
        
        return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
    }
    
    playTime = timeToSeconds(playTime);
    advTime = timeToSeconds(advTime);
    
    let prefixSum = new Array(playTime + 1).fill(0);
    let answer = '';
    
    for(const log of logs) {
        let [startTime, endTime] = log.split('-');

        prefixSum[timeToSeconds(startTime)]++;
        prefixSum[timeToSeconds(endTime)]--;
    }
    
    for(let i = 1; i < prefixSum.length; i++) {
        prefixSum[i] += prefixSum[i - 1];
    }
    
    for(let i = 1; i < prefixSum.length; i++) {
        prefixSum[i] += prefixSum[i - 1];
    }
    
    let max = prefixSum[advTime - 1];
    let answerTime = null;
    
    for(let i = advTime; i <= playTime; i++) {
        const currentTime = i - advTime + 1;
        const totalViewers = prefixSum[i] - prefixSum[currentTime - 1];
        
        if(totalViewers > max) {
            answerTime = currentTime;
            max = totalViewers;
        }
    }
    
    return secondsToTimes(answerTime);
}