/*
    역 -> 사무실
    
    0. 09:00부터 t분 간격으로 m명씩 태운 버스가 역에 도착한다. 총 n대 운행한다.
    1. 셔틀은 09:00부터 운행
    2. 셔틀을 타기 위해 미리 기다릴 수 있음.
    3. 콘이 가장 늦게 '사무실'에 도착할 수 있는 시각 구하기.
    4. timetable은 크루들이 도착해서 기다리는 시각
    조건
    1. 콘은 막차만 탄다.
    2. 막차 수용인원이 충분할 경우, 막차 도착 시간과 같이 오면 된다.
    3. 막차 수용인원이 충분하지 않을 경우, 막차를 타는 마지막 탑승인원보다 단 1분만 일찍 도착하면 된다.
    
    
*/

function parseTime(minutes) {
    // minute to time
    let hour = Math.floor(minutes / 60);
    hour = (hour >= 10) ? hour : `0${hour}`;
    
    let minute = (minutes % 60);
    minute = (minute >= 10) ? minute : `0${minute}`;
    
    return `${hour}:${minute}`;
}

function parseMinutes(time) {
    // time to minutes
    const [hour, minute] = time.split(':').map((num) => Number(num));
    
    return hour * 60 + minute;
}

function compareTime(t1, t2) {
    const [t1Hour, t1Minute] = t1.split(':').map((num) => Number(num));
    const [t2Hour, t2Minute] = t2.split(':').map((num) => Number(num));
    
    if(t1Hour === t2Hour && t1Minute === t2Minute) return 0; // t1 === t2 : 0
    if(t1Hour > t2Hour || (t1Hour === t2Hour && t1Minute > t2Minute)) return 1; 
    // t1 > t2 : 1
    
    return 2; // t1 < t2 : 2
}

function addTime(time, addedTime) {
    const pT = Number(parseMinutes(time));
    const addedPT = Number(parseMinutes(addedTime));
    
    return parseTime(pT + addedPT);
}

function solution(n, t, m, timetable) {
    let answer = '';
    
    timetable.sort();
    
    let baseTime = "09:00";
    
    // 마지막 셔틀버스 전까지의 timetable을 처리해준다.
    
    for(let i = 0; i < n - 1; i++) {
        const destTime = addTime(baseTime, parseTime(i * t));
        
        for(let j = 0; j < m; j++){
            if(compareTime(timetable[0], destTime) !== 1) timetable.shift();
        }
    }

    // 마지막 셔틀버스
    
    const lastDestTime = addTime(baseTime, parseTime((n - 1) * t));
          
    const lastBoardingCrews = timetable.filter((crewDestTime, index) => {
        if(index >= m) return false;
        return compareTime(crewDestTime, lastDestTime) !== 1;
    }) 
    
    // 막차 수용인원이 충분할 경우, 막차 도착 시간과 같이 오면 된다.
    if(lastBoardingCrews.length < m) return lastDestTime;
    
    // 막차 수용인원이 충분하지 않을 경우, 막차를 타는 마지막 탑승인원보다 단 1분만 일찍 도착하면 된다.
    return addTime(lastBoardingCrews[lastBoardingCrews.length - 1], "00:-01");
}