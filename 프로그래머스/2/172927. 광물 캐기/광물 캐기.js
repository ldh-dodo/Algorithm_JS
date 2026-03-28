function solution(picks, minerals) {
   /*
   곡괭이 종류 : 다이아, 철, 돌
   개수 : 0개 ~ 5개 -> 광물 5개 캐면 1개 소모
   
   행동 : 광물 캐기 -> 피로도 소모
   
   picks [dia, iron, stone] 
   return 최소한의 피로도로 
   
   그룹으로 묶고
   그룹별 피로도로 정렬한 뒤
   좋은 곡괭이를 우선 배정
   */
    const cost = { 'diamond' : [1, 5, 25], 'iron' : [1, 1, 5], 'stone' : [1, 1, 1]} // 광물을 [] 곡괭이로 캐는데의 비용 [다이아, 철, 돌]
    const groups = [];
    const totalPicks = picks.reduce((a, b) => a + b, 0);
    
    for(let i = 0; i < minerals.length && groups.length < totalPicks; i += 5) {
        groups.push(minerals.slice(i, i + 5));
    }
    
    groups.sort((a, b) => {
        const cal = (group) => {
            return group.reduce((acc, cur) => acc + cost[cur][2], 0);
        }
        
        return cal(b) - cal(a);
    });
    
    let pickIdx = 0;
    let fatigue = 0;
    
    for(const group of groups) {
        while(picks[pickIdx] === 0) pickIdx++;
        
        for(const m of group) {
            fatigue += cost[m][pickIdx];
        }
        
        picks[pickIdx]--;
    }
    
    return fatigue;
}