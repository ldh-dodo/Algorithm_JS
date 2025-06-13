function solution(n, cores) {
    /*
    - 코어별로 작업을 처리하는 시간이 다름
    - 한 코어가 작업이 끝나면 작업이 없는 코어가 다음 작업을 수행
    - 앞의 코어부터 작업을 처리
    
    n : 작업의 개수
    cores : 코어의 처리시간
    
    마지막 작업을 처리하는 코어의 번호를 반환하라.
    
    풀이 전략
    코어를 처리하는 총 시간을 구하고, 총 시간을 통해 마지막 코어의 번호를 구하기
    이분 탐색 활용
    최대 시간 = 작업 처리 최대 시간 * 최대 일의 개수 = 10000 * 50000 = 500000000
    */
    
    let l = 0;
    let r = 500000001;
    
    let totalTime = null;
    
    while(l < r) {
        let mid = Math.floor((l + r) / 2);
        
        const workCnt = cores.reduce((acc, cur) => acc + Math.floor(mid / cur), 0) 
                        + cores.length;    
        
        if(workCnt >= n) r = mid;
        else l = mid + 1;
    }
    
    let totalWorks = cores.reduce((acc, cur) => acc + Math.floor(r / cur), 0) 
                        + cores.length;   
    totalTime = r;
    
    while(totalTime > 0) {
        for(let i = cores.length - 1; i >= 0; i--) {
            if(totalTime % cores[i] === 0) {
                totalWorks--;
                if(totalWorks === n - 1) {
                    return i + 1;
                }
            }
        }
        totalTime--;
    }
}