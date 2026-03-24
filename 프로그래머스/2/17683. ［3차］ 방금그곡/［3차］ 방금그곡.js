function solution(m, musicinfos) {
    /*
        멜로디를 가지고 '방금그곡' 을 이용해 음악을 찾는다.
        한 음악 반복 재생 -> 음악 끝부분과, 처음 부분이 이어서 재생된 멜로디일 수 있음
        
        음은 1분에 1개씩 재생
        음악은 반드시 처음부터 재생
        
        음악 길이 < 재생된 시간 -> 음악은 끊김없이 처음부터 반복해서 재생
        음악 길이 >= 재생된 시간 -> 처음부터 재생 시간만큼만 재생
        
        음악은 23:59까지 재생
        
        조건 일치하는 음악 여러개 -> 재생된 시간이 제일 긴 음악제목 반환 -> 먼저 입력된 음악 반환
        
        
        return : 음악 제목 || (None)
    */
    
    function timeToMin(time) {
        const [hour, min] = time.split(':').map(Number);
        
        return hour * 60 + min;
    }
    
    
    function parseMelody(m) {
        const melody = [];
        
        for(let i = 0; i < m.length; i++) {
            if(i + 1 < m.length && m[i + 1] === '#') {
                melody.push(`${m[i]}#`);
                i++;
            } else {
                melody.push(m[i]);
            }
        }
        
        return melody;
    }
    
    const answer = [];
    const mParsed = parseMelody(m);
    
    musicinfos = musicinfos.map((row) => row.split(',')); 
    // [st, end, title, melody]
    
    for(const [st, end, title, musicM] of musicinfos) {
        let timeDiff = timeToMin(end) - timeToMin(st);
        
        let t = 0;
        
        // melody 처리
        const parsedMelody = parseMelody(musicM);
        const melody = [];
        
        for(let t = 0; t < timeDiff; t++) {
            melody.push(parsedMelody[t % parsedMelody.length]);
        }
        
        for(let i = 0; i < melody.length; i++) {
            let flag = true;
            
            for(let j = 0; j < mParsed.length; j++) {
                if(melody[i + j] !== mParsed[j]) {
                    flag = false;
                    break;
                }
            }
            
            if(flag) {
                answer.push([title, timeDiff, answer.length + 1]);
                break;
            }
        }
    }
    
    let answerMusic = answer.sort((a, b) => b[1] - a[1] || a[2] - b[2]);
    answerMusic = answerMusic.length === 0 ? '(None)' : answerMusic[0][0];

    return answerMusic;
}