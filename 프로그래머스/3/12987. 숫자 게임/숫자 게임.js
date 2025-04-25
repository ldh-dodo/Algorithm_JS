function solution(A, B) {
    // 숫자 같으면 승점 얻지 X
    // B팀은 A팀의 경기에서 이길 수 있다면, 가능한 작은 수로 이기는 것이 좋음
    
    const SIZE = A.length;
    let answer = 0;
    let bIdx = 0;
    
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);

    for(let i = 0; i < SIZE; i++) { // A팀
        while(bIdx < SIZE) {
            if(A[i] < B[bIdx]) {
                answer++;
                bIdx++;
                break;
            } else bIdx++;
        }
    }
    
    return answer;
}