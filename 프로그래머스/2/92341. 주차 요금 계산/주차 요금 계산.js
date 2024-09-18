function parseToMinute(time){
    let [hour, minute] = time.split(':');
    const minutes = Number(hour) * 60 + Number(minute);
    
    return minutes;
}
function solution(fees, records) {
    let answer = [];
    let hash = {};
    let answerHash = {};
    const [baseTime, baseCost, unitTime, unitCost] = fees;
    
    for(let i = 0; i < records.length; i++){
        let [time, carNum, history] = records[i].split(' ');
        
        let minutes = parseToMinute(time);
        // history가 IN이면, hash에 삽입
        // OUT 이면, 기존 hash delete, answerHash에 저장
        
        if(history === 'IN'){
            hash[carNum] = minutes;
        } else { // history === 'OUT'
            
            answerHash[carNum] = (answerHash[carNum] | undefined) + minutes - hash[carNum];

            delete hash[carNum];
        }
    }
    
    
    if(hash){ // 출차 기록이 없지만, 입차 기록은 있는 경우도 처리
        let minutes = parseToMinute('23:59');
        let keys = Object.keys(hash);
        
        for(const key of keys){
            answerHash[key] = (answerHash[key] | undefined) + minutes - hash[key];
            delete hash[key];
        }
    }

    // answerHash는 차량 번호가 작은 자동차부터, 배열로 변환해서 반환
    
    const sortedMinutes = Object.keys(answerHash).sort((a,b) => a.localeCompare(b)).map(carNum => answerHash[carNum]);

    for(let i = 0; i < sortedMinutes.length; i++){
        let minutes = sortedMinutes[i];
        
        if(minutes <= baseTime){
            answer.push(baseCost);
        } else {
            minutes-=baseTime;
            answer.push(baseCost + Math.ceil(minutes / unitTime) * unitCost);
        }
    }
    
    return answer;
}