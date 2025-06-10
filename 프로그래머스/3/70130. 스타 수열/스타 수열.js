function solution(a) {
    /*
    부분 수열 : 원래 수열에서 어떤 요소를 제거해서 얻을 수 있는 부분
    스타 수열 조건
    - 요소의 개수가 짝수
    - 앞에서부터 두 개씩 쌍을 지었을 때 쌍들의 교집합의 원소의 개수가 1이상
    - 단, 쌍을 이룬 두 수는 서로 다른 수여야 함
    
    길이가 4인 스타수열을 만드려면 5가 2개필요.
    
    풀이 전략
    - 각 원소들의 개수를 센다.
    - 각 원소들의 set을 순회하며 해당 원소를 교집합으로 갖도록 하는 스타수열의 길이를 갱신하며 구한다.
    - 쌍의 개수 * 2 가 최대 스타수열의 길이이므로, 최대 길이보다 작다면 순회하지 않도록하여 효율성을 향상시킨다.
    
    */
    if(a.length <= 2) return 0;
    
    const counts = {};
    let maxLen = 0;
    
    for(const number of a) {
        counts[number] = (counts[number] || 0) + 1;
    }
    
    
    for(const key in counts) {
        if(counts[key] * 2 < maxLen) continue;
        
        const cur = Number(key);
        let pairCnt = 0;
        
        for(let i = 0; i < a.length - 1; i++) {
            const hasKey = a[i] === cur || a[i + 1] === cur;
            const isNotEqual = a[i] !== a[i + 1];
            
            if(hasKey && isNotEqual) {
                pairCnt++;
                i++;
            }
        }
        maxLen = Math.max(maxLen, pairCnt * 2);
    }
    
    return maxLen;
}