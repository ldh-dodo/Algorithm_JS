function solution(a) {
    /*
    풍선의 숫자는 모두 다름
    풍선을 규칙에 따라 1개만 남을 때까지 터트리려고 함.
    
    규칙
    1. 인접한 풍선을 고르고, 두 풍선 중 하나를 터뜨린다.
    2. 빈공간이 생겼다면, 밀착시킨다.
    3. 인접한 두 풍선 중에서 번호가 더 작은 풍선을 터트리는건 최대 1번만 할 수 있다.
    
    최후까지 남기는 것이 가능한 풍선들의 개수를 구하라.
    
    풀이 전략
    더 작은 풍선을 터뜨리는 순간, 마지막에 남는 값은 남은 값 중 가장 작은 값
    
    왼쪽 -> 오른쪽
    오른쪽 -> 왼쪽으로 최소값을 저장한다.
    전체 최소가 아니더라도, 다른 최소가 나왔을 때 그 풍선을 터뜨린다면 그 풍선은 마지막에 남을 수 있음.
    최소값에 포함된 set의 개수가 정답
    */
    
    let answer = new Set();
    const len = a.length;
    let leftToRMIN = new Array(len);
    let rightToLMIN = new Array(len);
    
    leftToRMIN[0] = a[0];
    rightToLMIN[len - 1] = a[len - 1];
    
    answer.add(a[0]);
    answer.add(a[len - 1]);
    
    for(let i = 1; i < len; i++) {
        let rIdx = len - i - 1;
        
        leftToRMIN[i] = Math.min(leftToRMIN[i - 1], a[i]);
        rightToLMIN[rIdx] = Math.min(rightToLMIN[rIdx + 1], a[rIdx]);
        
        answer.add(leftToRMIN[i]);
        answer.add(rightToLMIN[rIdx]);
    }
    
    return answer.size;
}