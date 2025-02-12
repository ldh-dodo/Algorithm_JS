function solution(scores) {
    /* 
        - 각 사원은 [근무 태도 점수, 동료 평가 점수]를 가진다.
        - 어떤 사원이 다른 사원보다 두 점수가 모두 낮은 경우가 존재하면 인센티브 대상에서 제외
        - 인센티브 대상인 사원들에 대해, 두 점수의 합이 높은 순으로 석차를 낸다.
        - 점수가 동일하면 동석차이다.
        - 동석차의 수만큼 다음 석차는 건너뛴다.
    */
    
    let len = scores.length;
    let isEligible = Array(scores.length).fill(true);
    
    function setIsEligibleArray() {
       let sortedScores = scores.map((score, idx) => [...score, idx]).sort(
           (a,b) => b[0] === a[0] ? a[1] - b[1] : b[0] - a[0]);
        
        let maxPeerScore = sortedScores[0][1];

        for(let i = 1; i < len; i++) {
            const curPeerScore = sortedScores[i][1];
            
            if (maxPeerScore > curPeerScore) {
                 isEligible[sortedScores[i][2]] = false;
                continue;
            }
            
            maxPeerScore = curPeerScore;
        }
    }
    
    setIsEligibleArray();
    
    if(!isEligible[0]) return -1;

    let wanhoTotalScore = scores[0][0] + scores[0][1];
    let rank = 1;
   
    for(let i = 1; i < len; i++) {
        if(!isEligible[i]) continue;
        
        const totalScore = scores[i][0] + scores[i][1];
        
        if(wanhoTotalScore < totalScore) rank++;
    }
    
    return rank;
}