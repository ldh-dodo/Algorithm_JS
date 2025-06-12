function solution(target) {
    /*
    - 다트를 던지면서 점수를 깎아 0점으로 만든다.
    - 과녁에는 1 ~ 20 까지의 수가 이싸.
    - 싱글, 더블, 트리플 칸이 있고 각각 기본 점수에 x1, x2, x3 만큼의 점수를 얻는다.
    - 불, 아우터 불은 50점을 얻는다.
    - 같은 라운드 승리시, 싱글, 불을 더 많이 던진 선수가 승리하며 그 경우도 일치하면 선공이 승리한다.
    - 목표 점수가 주어졌을 때, 가장 빨리 승리할 수 있는 최선의 경우를 구하라
    - [다트 수, 싱글 or 불을 맞춘 횟수] 를 배열에 담아 반환
    
    풀이 전략
    - dp를 사용
    - 1 ~ 20 은 싱글, 20 ~ 40 은 더블, 50은 불, 40 ~ 60은 트리플로 초기화
    - 나머지 초기화되지 않은 dp는 기존에 초기화 된 dp 값 두 개를 더하여 최적의 값 갱신        
    */
    
    let dp = new Array(target + 1).fill().map(() => [Infinity, 0]);
    
    let answer = [];
    
    for(let i = 1; i <= target; i++) { 
        // 초기화
        if(i <= 20) {
            dp[i] = [1, 1];
            continue;
        } else if(i <= 40 && (i % 2 === 0)) {
            dp[i] = [1, 0];
            continue;
        } else if(i === 50) {
            dp[i] = [1, 1];
            continue;
        } else if(i <= 60 && (i % 3 === 0)) {
            dp[i] = [1, 0];
            continue;
        } 
        
        for(let j = 1; j <= 20; j++) {
            for(let k = 1; k <= 3; k++) {
                if(i < j * k) break;
                
                const [v1, v2] = [dp[j * k], dp[i - j * k]]; // v1 + v2 = i
                
                if((dp[i][0] > v1[0] + v2[0]) || 
                   ((dp[i][0] === v1[0] + v2[0]) && dp[i][1] < v1[1] + v2[1])) {
                    dp[i] = [v1[0] + v2[0], v1[1] + v2[1]];
                    continue;
                }
            }
        }
        
        if(i >= 50) {
            const [v1, v2] = [dp[50], dp[i - 50]]; // v1 + v2 = i
            
             if((dp[i][0] > v1[0] + v2[0]) || 
               ((dp[i][0] === v1[0] + v2[0]) && dp[i][1] < v1[1] + v2[1])) {
                dp[i] = [v1[0] + v2[0], v1[1] + v2[1]];
                continue;
            }
        }
    }
    
    return dp[target];
}