function solution(scores) {
    // 각 사원은 [근무 태도 점수, 동료 평가 점수] 를 가짐
    // 어떤 사원이 다른 사원보다 두 점수가 모두 낮은 경우가 한 번이라도 있다면 인센티브 X
    // 그렇지 않은 인원들은 두 점수의 합이 높은 순으로 석차를 내어 인센티브 차등 지급
    // 합이 동일하면 동석차, 동 석차의 수만큼 다음 석차는 건너 뜀
    // 1번째 사원인 완호의 석차를 구하라
    
    /*
    인센티브를 받지 못하는 사람을 식별해야함.
    
    1. 근무 태도 점수 내림차순으로 정렬하되, 같다면 역시 동료 평가 점수 오름차순으로 정렬한다.
    2. 뒤의 인원은 앞의 인원보다 근무 점수가 작거나 같으므로, 동료 점수마저 작다면, 인센티브 대상에서 제외
    앞에서 뒤로 순회하며, 최대 동료 평가 점수를 저장해두고, 그것보다 작다면 인센티브 대상에서 제외됨.
    3. 인센티브 대상이, 완호의 합보다 크다면, 완호의 등수를 +1 한다.
    */
    const wanho = scores[0];
    const wanhoSum = wanho[0] + wanho[1];
    let wanhoRank = 1;
    let maxColleagueScore = 0;
    
    scores.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
    
    for(let i = 0; i < scores.length; i++) {
        const cScore = scores[i][1];
        const curSum = scores[i][0] + cScore;
        
        if(cScore < maxColleagueScore) {
            if(wanho[0] === scores[i][0] && wanho[1] === scores[i][1]) {
                return -1;
            }
        } else {
            maxColleagueScore = Math.max(maxColleagueScore, cScore);
            if(curSum > wanhoSum) wanhoRank++;
        }
    }
    
    return wanhoRank;
}