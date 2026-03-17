function solution(n, s) {
    /*
    최고의 집합 조건
    - 각 원소의 합 S이 되는 수의 집합
    - 위 조건을 만족하는 집합 중, 원소의 곱이 최대가 되는 집합
     - 즉, 원소의 차이가 가장 적은 집합
    
    조합으로 구하면 시간복잡도 무조건 터짐.
    
    n / s를 이용해서 원소를 채울 수 있어보임
    */
    
    if(n > s) return [-1];
    
    const answer = [];
    const base = Math.floor(s / n);
    for(let i = 0; i < n; i++) {
        answer.push(base);
    }
    
    let remain = s % n;
    for(let i = answer.length - 1; i >= 0; i--) {
        if(remain <= 0) break;
        
        answer[i]++;
        remain--;
    }
    
    return answer;
}

