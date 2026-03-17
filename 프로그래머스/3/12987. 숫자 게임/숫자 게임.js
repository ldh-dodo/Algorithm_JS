function solution(A, B) {
    /*
    A B 팀
    N N 
    
    모든 사원 : 무작위 자연수, 한 번씩 경기
    각 팀당 한 명씩 겨루고, 숫자 큰 쪽 승리
    이긴 팀 승점 1점. 숫자 같다면 승점 X
    A팀 순서 공개 -> B팀이 승점 높이는 방법으로 출전 순서 정해야 함. 이 때 B팀이 얻는 승점
    
    전략: 가장 적은 B로 A를 이겨라
    */
    const N = A.length;
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);
    
    let bIdx = 0;
    let answer = 0;
    
    for(let i = 0; i < N; i++) {
        const curA = A[i];
        while(bIdx < N) {
            if(curA < B[bIdx]) {
                bIdx++;
                answer++;
                break;
            } else bIdx++;
        }
    }
    return answer;
}