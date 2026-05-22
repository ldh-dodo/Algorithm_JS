function solution(target) {
    /*
    숫자 : 1 ~ 20, 불(50)
    보너스: 싱글, 더블, 트리플
    
    점수 0점 만들면 승리
    싱글 또는 불을 최대한 많이 던지는 방법 선택
    
    return: [던질 다트 수, 싱글 또는 불을 맞춘 횟수의 합]
    
    1 ~ 20 : 싱글, 한 개
    21 ~ 49
    
    50
    
    
    */
    
    const dp = Array.from({length: target + 1}, () => [Infinity, 0]);
    
    for(let i = 1; i <= target; i++) {
        if(i <= 20) { 
            dp[i] = [1, 1]; // 1 ~ 20 싱글 하나로 반드시 만들 수 있음
        } else if(i <= 40 && (i % 2 === 0)) {
            dp[i] = [1, 0]; // 1 ~ 20 더블 하나로 만들 수 있다면 초기화
        } else if(i <= 60 && (i % 3 === 0)) {
            dp[i] = [1, 0]; // 1 ~ 20 트리플 하나로 만들 수 있다면 초기화
        } else if(i === 50) {
            dp[i] = [1, 1];
        }
        
        for(let j = 1; j <= 20; j++) {
            for(let k = 1; k <= 3; k++) {
                if(i < j * k) continue;
                
                const [v1, v2] = [dp[j * k], dp[i - (j * k)]];
                
                if((dp[i][0] > v1[0] + v2[0]) || 
                  ((dp[i][0] === v1[0] + v2[0]) && (dp[i][1] < v1[1] + v1[1]))) {
                    dp[i] = [v1[0] + v2[0], v1[1] + v2[1]];
                }
            }
        }
        
        if(i >= 50) {
            const [v1, v2] = [dp[i - 50], dp[50]];
            
            if((dp[i][0] > v1[0] + v2[0]) || 
                ((dp[i][0] === v1[0] + v2[0]) && (dp[i][1] < v1[1] + v1[1]))) {
                    dp[i] = [v1[0] + v2[0], v1[1] + v2[1]];
            }
        }
    }
    
    return dp[target];
}