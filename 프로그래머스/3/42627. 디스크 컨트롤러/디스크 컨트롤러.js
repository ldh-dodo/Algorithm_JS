function solution(jobs) {
    /*
    1. 대기큐는 [작업 번호, 요청 시각, 소요 시간] 으로 이루어져 있다.
    2. 작업을 하지 않는다면, 가장 우선순위가 높은 작업을 꺼낸다.
    3. 우선순위는 1. 소요시간 짧은 것 2. 요청 시각이 빠른 것 3. 작업 번호가 작은 순
    4. 한 번 작업을 시작하면 그 작업만 수행
    5. 작업을 넣는 시간은 0초라고 가정. 즉, 넣고 빼는게 동시에 가능
    6. 반환 시간(총 걸린 시간 - 요청 시각)의 평균을 floor 해서 반환    
    
    jobs = [s, i] : s는 요청 시각, i는 소요 시간
    흐름
    1.
    */
    
    var answer = 0;
    let jobLen = jobs.length;
    
    jobs = jobs.map((job, idx) => {
        return [idx, ...job];
    })
    
    
    jobs.sort((job1, job2) => {
        //  우선순위는 1. 소요시간 짧은 것 2. 요청 시각이 빠른 것 3. 작업 번호가 작은 순
        // 소요시간, 요청 시각 같다면, 작업 번호 오름차순 정렬
        // 소요시간 같다면, 요청 시각 오름차순 정렬
        // 소요시간 같지 않다면, 소요 시간 오름차순
        
        if(job1[1] === job2[1] && job1[2] === job2[2]){
            return job1[0] - job2[0];
        }
        
        if(job1[2] === job2[2]){
            return job1[1] - job2[1];
        }
        
        return job1[2] - job2[2];
    })
    
    let currentTime = 0;
    let idx = 0;

    while(jobs.length > 0) {
        if(idx >= jobs.length){
            // 이 경우는 currentTime을 가장 작은 요청 시간 디스크로 맞춰줘야함
            
            const reqTimes = jobs.map((job) => job[1]);
            const minReqTimes = Math.min(...reqTimes);
            
            currentTime = minReqTimes;
            idx = 0;
        }
        
        let [_, reqTime, timeCost] = jobs[idx];
        
        if(currentTime >= reqTime) {
            answer += (currentTime - reqTime) + timeCost;
            currentTime += timeCost;
            
            jobs.splice(idx, 1);
            idx = 0;
        } else {
            idx++; 
            continue;
        }
    }
    
    answer = Math.floor(answer / jobLen);
    
    return answer;
}
