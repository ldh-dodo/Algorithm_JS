function solution(lines) {
    const MAX = 24 * 60 * 60 * 1000;
    let times = [];
    
    lines = lines.map((line) => line.split(' ').filter((_, idx) => idx !== 0));
    lines = lines.map((line) => [parseTimeToMs(line[0]), 1000 * Number(line[1].slice(0, line[1].length - 1))]);
    
    
    // before + T - 1 = after
    
    for(const [end, T] of lines) {
        const st = end - T + 1;
        
        times.push([0, st]) // 0 : start, 1 : end
        times.push([1, end + 999]);
    }
    
    times.sort((a, b) => {
        if(a[1] === b[1]) return a[0] - b[0];
        
        return a[1] - b[1];
    });
    
    let answer = -Infinity;
    let cnt = 0;
    
    for(const [type, time] of times) {
        if(type === 1) {
            answer = Math.max(answer, cnt);
            cnt--;
        } else {
          cnt++;  
        }
    }
    
    
    function parseTimeToMs(time) { // hh:mm:ss.sss -> ms
        let [h, m, s, ms] = time.split(':');
        [s, ms] = s.split('.');
        
        return Number(h) * 60 * 60 * 1000 + Number(m) * 60 * 1000 + Number(s) * 1000 + Number(ms);
    }
    
    
    return answer;
}