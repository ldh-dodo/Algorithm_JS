function solution(n, t, m, timetable) {
    /*
    셔틀은 09:00부터 총 n회 t분 간격으로 역에 도착.
    최대 m명의 승객을 태울 수 있음
    
    콘이 셔틀을 타고 사무실로 가라 수 있는 도착 시각 중 제일 늦은 시각
    콘은 대기열에서 제일 뒤에 섬
    
    timetable HH:MM 형식
    
    콘은 반드시 (09:00 ~ 마지막으로 셔틀이 역에 도착하는 시간) 사이에는 와야 한다.
    
    만약, 해당 시간 내에 모든 인원(timetable.length + 1)이 셔틀을 탈 수 있으면, 마지막으로 셔틀이 역에 도착하는 시간에 오면 된다.
    
    만약, 모든 인원이 셔틀을 탈 수 없다면.. 콘은 가장 마지막으로 탈 수 있는 사람보다 1분 일찍 오면 됨
    */ 
    
    const timeToMinutes = (time) => {
        const [hour, minutes] = time.split(':');
        
        return Number(hour) * 60 + Number(minutes);
    }
    
    const minutesToTime = (minutes) => {
        let hour = Math.floor(minutes / 60).toString();
        let min = (minutes % 60).toString();
        
        return `${hour.padStart(2, 0)}:${min.padStart(2, 0)}`;
    }

    const MAX_PEOPLE = n * m;
    const TOTAL_PEOPLE = timetable.length;
    let currentTime = timeToMinutes('09:00');
    const MAX_TIME = currentTime + ((n - 1) * t);

    let peopleCnt = 0;
    let flag = false;    
    
    timetable = timetable.map(timeToMinutes);
    timetable.sort((a, b) => b - a);
    let lastTime = null;
    
    for(let i = 0; i < n; i++) {
        flag = false;
        
        for(let k = 0; k < m; k++) {
            if(timetable.length === 0 || timetable[timetable.length - 1] > currentTime) break;

            lastTime = timetable.pop();
            if(peopleCnt + 1 === MAX_PEOPLE) return minutesToTime(lastTime - 1);
            peopleCnt++;
            
            if(k === m - 1) flag = true;
        }
        
        currentTime += t;
    }

    if(flag) return minutesToTime(lastTime - 1);
    return minutesToTime(MAX_TIME);
}