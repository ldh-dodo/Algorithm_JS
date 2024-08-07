function solution(n,a,b)
{
    var answer = 0;

    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    
    while(Math.abs(a-b) !== 0){
        if(a % 2 === 1){
            a++;
        }
        if(b % 2 === 1){
            b++;
        }
        a /= 2;
        b /= 2;
        answer++;
    }

    return answer;
}