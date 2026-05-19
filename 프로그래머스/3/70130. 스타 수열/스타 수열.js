function solution(a) {
   /*
   부분 수열: 원소를 제거하거나 그러지 않고, '원래 순서를 유지' 하여 얻을 수 있는 '새로운 수열'
   스타수열
   - 길이 2 이상
   
   return : 가장 길이가 긴 스타 수열의 길이
   */ 
    
    const hash = {};
    let answer = 0;
    
    for(let i = 0; i < a.length; i++) {
        hash[a[i]] = (hash[a[i]] | 0) + 1;
    }
    
    for(const v in hash) {
        if(hash[v] <= (answer / 2)) continue;
        
        const V = Number(v);
        let count = 0;
        
        for(let i = 0; i < a.length - 1; i++) {
            if((a[i] === V || a[i+1] === V) && (a[i] !== a[i+1])) {
                i++;
                count += 2;
            }
        }
        
        answer = Math.max(answer, count);
    }
    
    return answer;
}