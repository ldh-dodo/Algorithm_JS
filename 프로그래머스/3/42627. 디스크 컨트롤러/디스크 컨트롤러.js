function solution(jobs) {
    /*
        작업 번호, 요청 시각, 소요 시간
        
        우선순위
        1. 소요 시간 짧은 것
        2. 요청 시각 빠른 것
        3. 작업 번호 작은 것
        
        반환 시간 = 종료 시각 - 요청 시각
        반환 시간의 평균 구하기.        
    */
    // 1. [작업 번호, 요청 시각, 소요 시간] 으로 배열 만들기
    const len = jobs.length;
    jobs = jobs.map((el, idx) => [idx, ...el]);

    // 2. 우선순위로 정렬
    jobs.sort((a, b) => {
        if(a[2] === b[2] && a[1] === b[1]) return a[0] - b[0]
        if(a[2] === b[2]) return a[1] - b[1];
        return a[2] - b[2];
    });
    
    let time = 0;
    let turnaroundTimes = [];
    
    // 3. 반복문으로 각 작업의 종료 시각을 구하기
    let answer = 0;
    let finishCnt = 0;
    let i = 0;
    let currentTime = 0;
    
    while(finishCnt < len) {
        if(i >= jobs.length) {
            const minRequestTime = Math.min(...jobs.map((el) => el[1]));
            currentTime = minRequestTime;
            i = 0;
        }
        
        let [_, st, cost] = jobs[i];
        
        if(currentTime < st) i++;
        else {
            finishCnt++;
            currentTime += cost;
            answer += (currentTime - st);
            
            jobs.splice(i, 1);
            i = 0;
        }
    }
       
    // 4. 평균 구하기
    answer = Math.floor(answer / len);
    
    return answer;
}