function solution(e, starts) {
    let answer = [];
    
    /*
    s보다 크거나 같고 e보다 작거나 같은 수 중, 억억단에서 가장 많이 등장한 수를 답해야 함.
    여러개라면 가장 작은 수 
    
    1 ~ 8 까지 8의 개수 -> 8의 약수
    3 ~ 8 까지 8의 개수 -> 1 ~ 8까지 8의 개수 - 1 ~ 2 까지 8의 개수 
    
    */
    
    let memo = Array.from({length : e + 1}, () => null);
    let maxIdx = Array.from({length : e + 1}, () => e);
    // i ~ e 까지, 약수가 가장 많은 숫자의 인덱스를 저장
    
    for(let i = 1; i <= e; i++) {
        for(let j = i; j <= e; j += i){
            memo[j] += 1;
        }
    }
    
    for(let i = e - 1; i > 0; i--) {
        if(memo[i] >= memo[maxIdx[i + 1]]) maxIdx[i] = i;
        else maxIdx[i] = maxIdx[i + 1];
    }

    answer = starts.map((st) => maxIdx[st]);
    
    return answer;
}