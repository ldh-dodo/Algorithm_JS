function solution(n)
{
    let ans = 0;

    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    
    // 행동
    //  K칸 앞으로 점프(건전지 사용 O)
    //  (현재까지 온 거리) x 2 -> 건전지 사용 X
    
    // 건전지 사용량 최소 (점프 최소화)
    
    
    while(n >= 1){
        if(n % 2 === 0){
            n /= 2;
        } else {
            n--;
            ans++;
        }
    }
    
    return ans;
}