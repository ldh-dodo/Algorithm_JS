function solution(n, t, m, timetable) {
    /*
    셔틀은 09:00부터 총 n 회 t 분 간격으로 '역에 도착'
    최대 m 명 승객
    
    역에 도착한 순간, 대기 순서대로 태우고 바로 출발
    
    콘이 셔틀을 타고 사무실로 갈 수 있는 도착 시각 중 제일 늦은 시각을 구하라
    콘은 같은 시각에 도착한 크루 중 가장 뒤에선다.
    */
    
    const secTable = timetable.map(timeToSec).sort((a, b) => a - b);
    let curSec = timeToSec('09:00') - timeToSec(`00:${String(t).padStart(2, '0')}`);
    
    let idx = 0;
    let people = 0;
    let perPeople = 0;
    for(let k = 0; k < n; k++) {
        if(people >= n * m) break;
        
        curSec += timeToSec(`00:${String(t).padStart(2, '0')}`);
        perPeople = 0;
        console.log(curSec);
        for(let i = 0; i < m; i++) {
            if(secTable[idx] <= curSec) {
                idx++;
                people++;
                perPeople++;
            }
                
            if(people >= n * m) break;
        }
        /*
        인원이 다 차는 경우가 없을 때는, 셔틀의 마지막 도착 시각
        인원이 다 차는 경우가 있을 때는, 마지막 인원보다 1분 빨리 도착
        */
    }
    
    function timeToSec(time) {
        const [hour, minute] = time.split(':').map(Number);
        
        return hour * 3600 + minute * 60;
    }
    
    function secToTime(sec) {
        const hour = Math.floor(sec / 3600);
        const min = Math.floor((sec % 3600) / 60);
        
        return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    }
    

    if(people < n * m && perPeople < m) return secToTime(curSec);
    return secToTime(secTable[idx - 1] - 60);
}