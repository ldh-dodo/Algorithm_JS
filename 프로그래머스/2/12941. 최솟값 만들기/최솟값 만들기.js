function solution(A,B){
    var answer = 0;
    
    A = A.sort((a,b) => a-b);
    B = B.sort((a,b) => b-a);
    
    let len = A.length;
    
    for(let i = 0; i < len; i++){
        answer += A[i] * B[i];
    }

    
    return answer;
}