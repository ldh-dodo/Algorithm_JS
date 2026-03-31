function solution(scores) {
    /*
    근무 태도 점수
    동료 평가 점수
    
    다른 임의의 사원보다 두 점수가 모두 낮은 경우가 존재하면 인센티브 X
    인센티브 O -> 두 점수의 합이 높은 순으로 석차
    return: 완호(idx: 0) 의 석차
    
    0번으로 오름차순

    */
    
    scores = scores.map(([a, b], idx) => [a, b, idx]);
    scores.sort((a, b) => b[0] - a[0] || a[1] - b[1] || a[2] - b[2]);
    
    const incentive = [];
    
    // a[0] >= b[0] 임이 보장
    
    let max = -Infinity;
    
    for(let i = 0; i < scores.length; i++) {
        const [a, b, idx] = scores[i];
        
        if(b >= max) incentive.push([a + b, idx]);
        max = Math.max(b, max);
    }
    
    incentive.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    
    for(let i = 0; i < incentive.length; i++) {
        if(incentive[i][1] === 0) return i + 1;
    }
    
    return -1;
}