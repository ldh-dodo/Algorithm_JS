function solution(A, B) {
    let answer = 0;
    
    A.sort((a,b) => a-b);
    B.sort((a,b) => a-b);
    

    // A는 오름차순, B는 내림차순 정렬
    // B의 요소 중, A의 가장 큰 요소보다 큰 값이 있을 때 순회하며 찾아내기
    
    // 순회에 들어가기 전, A의 가장 작은 요소가 B의 가장 큰 요소보다 크다면, 순회할 필요 없음
    // 0을 반환
    
    if(A[0] >= B[B.length-1]) return 0;
    
    for(let i = A.length - 1; i >=0; i--){
        let a_max = A[i];
        let b_max = B[B.length-1];
        
        if(a_max >= b_max){
            A.pop();
            continue;
        }
        
        let target_idx = B.length-1;
        
        for(let j = B.length - 2; j >=0; j--){
            let b_cur_val = B[j];
            
            if(b_cur_val < a_max) break;
            
            target_idx = j;
        }
        
        A.pop();
        B.splice(target_idx, 1);
        answer++;    
    }
    return answer;
}