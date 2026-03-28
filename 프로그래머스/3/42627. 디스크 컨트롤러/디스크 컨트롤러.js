function solution(jobs) {
    /*
    대기 큐 : [요청 시각, 소요 시간, 작업 번호]
    우선순위 : 소요시간 짧은 순 -> 요청 시각 빠른 순 -> 작업 번호 작은 순
    
    반환 시간 : 작업 종료 시각 - 요청 시각
    return : 반환 시간 평균의 정수 부분
    */
    
    jobs = jobs.map(([reqT, takeT], idx) => [reqT, takeT, idx]).sort((a, b) => a[1] - b[1] || a[0] - b[0] || a[2] - b[2]);
    
    const N = jobs.length;
    let fin = 0;
    let t = 0;
    let idx = 0;
    let minReqT = -1;
    let sum = 0;
    
    while(fin < N) {
        if(idx >= jobs.length) {
            minReqT = Math.min(...jobs.map((job) => job[0]));
            t = minReqT;
            idx = 0;
        }
        
        const [reqT, takeT] = jobs[idx];
        
        if(t < reqT) {
            idx++;
            continue;
        }
        

        t += takeT;
        fin++;
        sum += t - reqT;
        jobs.splice(idx, 1);
        idx = 0;
    }
    
    const avg = Math.floor(sum / N);
    
    return avg;
}