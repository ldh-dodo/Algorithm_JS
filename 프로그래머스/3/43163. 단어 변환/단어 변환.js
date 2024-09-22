function canConvert(source, target){
    let len = source.length;
    
    let cnt = 0;
    for(let i = 0; i < len; i++){
        if(cnt >= 2) return false;
        
        if(source[i] !== target[i]) cnt++;
    }
    
    if(cnt === 1) return true;
    
    return false;
}
function solution(begin, target, words) {
    /*
    words의 단어를 이용해,
    begin -> target으로 가는 가장 짧은 변환 과정 찾기
    
    출발지와 목적지가 정해진 BFS
    */
    if(!words.includes(target)) return 0;
    
    let q = [];
    let checked = {};
    
    q.push(begin);
    checked[begin] = 0; // 초기 단계는 0단계. checked hash에 값이 존재한다면 방문한 것
    
    while(q.length > 0){
        let cur = q.pop();
        
        if(cur === target) break;
        
        for(const next of words){
            // 1. next가 방문 되었는지 검사
            // 2. 1 통과시, cur과 한글자만 다른지 검사
            // 3. 2 통과시, 방문 체크 후, 큐에 삽입
            
            if(checked[next]) continue;
            if(!canConvert(cur, next)) continue;
            
            checked[next] = checked[cur] + 1;
            q.push(next);
        }
    }
    
    if(checked[target]) return checked[target];
    else return 0;
}