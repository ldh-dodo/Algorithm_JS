// function solution(limit, info) {
//     /*
//     어피치가 화살 n발을 다 쏘고 이후 라이언이 n발 쏜다.
//     라이언에게 불리하게 규칙이 정의되어있다.
    
//     과녁판의 점수는 10점 ~ 0 점까지이다.
    
//     k점에 어피치가 맞춘 화살 개수 >= 라이언 개수 > 0 -> k점을 어피치가 가져감
//     어피치 최종 점수 >= 라이언 점수 -> 어피치 우승
//     동등한 경우, 어피치가 유리한 규치 
    
//     라이언이 가장 큰 점수차이로 우승하기 위해 n발의 화살을 어떤 과녁에 맞춰야하는가
//     라이언 우승 못하면 [-1]
    
//     10 9 8 7 -> 34점
    
//     화살 개수를 충족하면서, 평균 점수가 높아야함
//     내가 생각하는 평균 점수란?
//     (내가 얻을 점수 + 어피치에게서 뺏을 점수) / 소모한 화살 수
//     화살 3발을 소모해서 10점을 얻었다면, 20 / 3 = 6.6
//     화살 2발을 소모해서 9점을 얻었다면, 18 / 2 = 9
//     화살 2발을 소모해서 8점을 얻었다면, 16 / 2 = 8
//     화살 2발을 소모해서 7점을 얻었다면 14 / 2 = 7
//     화살 1발을 소모해서 6점을 얻었다면 6 / 1 = 6점
    
    
//     [소모 화살 수, 평균 점수, 원점수] 로 두고, 평균 점수 내림차순, 소모 화살 수 오름차순으로 정렬
    
//     [2, 9, 9] [2, 8, 8] [2, 7, 7] [3, 6.6, 10] [1, 6, 6] 
    
//     화살 개수가 허용하는 범위내에서 앞에서부터 뽑으면
    
//     [2, 9, 9] [2, 8, 8] [1, 6, 6]
    
//     라고 생각했으나, 그리디로 풀 수 없었음.
//     내가 푼 방식은 내 점수를 최적화하는 방식이지, '점수차를 최대화' 하는 방식이 아님.
    
//     */

//     const sorted = [];
//     const N = 11;
    
//     info.forEach((k, i) => {
//         let avg = N - i;
        
//         if(k > 0) avg *= 2;
//         avg /= (k + 1);
        
//         sorted.push([k+1, avg, N - i]);
//     });
    
//     sorted.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    
//     let cnt = 0;
//     const answer = Array(N).fill(0);
    
//     for(const [arrow, avg, score] of sorted) {
//         if(arrow + cnt <= limit) {
//             cnt += arrow;
//             answer[N - score] = arrow;
//         } else {
//             answer[N - score] = 0;
//         }
//     }
    
//     let diff = 0;
    
//     for(let i = 0; i < N; i++) {
//         if(answer[i] > 0) diff += (N - i);
//         else if(info[i] > 0) diff -= (N - i);
//     }
    
//     const sum = answer.reduce((acc, cur) => acc + cur, 0);
    
//     if(sum < limit) {
//         answer[10] += N - sum - 1;
//     }
    
//     return diff < 0 ? [-1] : answer;
// }


function solution(limit, info) {
   const N = 11;
    let maxDiff = 0;
    let answer = [-1];
    
    function dfs(idx, remain, lion) {
        if(idx === N) {
            lion[N - 1] += remain;
            
            let apeachScore = 0, lionScore = 0;
            for(let i = 0; i < N; i++) {
                if(info[i] === 0 && lion[i] === 0) continue;
                if(lion[i] > info[i]) lionScore += (10 - i);
                else apeachScore += (10 - i);
            }
            
            const diff = lionScore - apeachScore;
            if(diff <= 0) {
                lion[N - 1] -= remain;
                return;   
            }
            
            if(diff > maxDiff) {
                maxDiff = diff;
                answer = [...lion];
            } else if(diff === maxDiff) {
                for(let i = N - 1; i >= 0; i--) {
                    if(answer[i] < lion[i]) {
                        answer = [...lion];
                        break;
                    } else if(lion[i] < answer[i]) break;
                }
            }
            
            lion[N - 1] -= remain;
            return;
        }
        
        if(remain >= info[idx] + 1) {
            lion[idx] = info[idx] + 1;
            dfs(idx + 1, remain - (info[idx] + 1), lion);
            lion[idx] = 0;
        }
        
        dfs(idx + 1, remain, lion);
    }
    

    dfs(0, limit, Array(N).fill(0));
    
    return answer;
}