function solution(weights) {
    // weights 최대 10만 -> O(N^2) 으론 안풀림
    // 2, 3, 4m 거리 시소. 총 세 개
    
    const freq = new Map();
    
    for(const w of weights) {
        freq.set(w, ((freq.get(w) || 0) + 1));
    }
    
    let answer = 0;
    
    
    for(const [w, q] of freq) {
        const n = freq.get(w);
        answer += (n * (n - 1) / 2);
    }
    
    const ratios = [[1, 2], [2, 3], [3, 4]];
    
    for(const [l, r] of ratios) {
        for(const w of freq.keys()){            
            if((l * w) % r === 0) {
                const target = (l * w) / r;
                if(freq.has(target)) {
                    answer += freq.get(w) * freq.get(target)
                }
            }
        }
    }
    
    return answer;
}