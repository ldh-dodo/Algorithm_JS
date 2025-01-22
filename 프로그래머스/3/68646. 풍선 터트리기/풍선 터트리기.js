function solution(a) {
    /*
    일렬로 나열된 서로 다른 숫자가 써진 풍선이 n개 있고, 한 개만 남을 때까지 규칙에 맞게 터뜨린다.
    
    규칙
    
    1. 임의의 인접한 두 풍선을 고른 뒤, 두 풍선 중 하나를 터뜨림
    2. 풍선이 터진 이후 풍선 사이 빈 공간이 생기면 서로 밀착시킨다.
    
    특별 규칙
    - 단 한번만 번호가 더 작은 풍선을 터뜨릴 수 있고, 이 기회를 소진하면 번호가 더 큰 풍선만을 터뜨릴 수 있다.
    
    반환값
    - 최후까지 남기는 것이 가능한 풍선들의 개수
    
    */
    
    let answer = 0;
    
    let len = a.length;
    let [leftMin, rightMin] = [Array(len), Array(len)];
    
    a.forEach((item, idx) => {
        if(idx === 0) {
            leftMin[0] = a[0];
            return;
        }
        
        leftMin[idx] = Math.min(item, leftMin[idx - 1]);
    });
    
    a.reduceRight((_, item, idx) => {
        if(idx === len - 1) {
            rightMin[len - 1] = a[len - 1];
            return;
        }
        
        rightMin[idx] = Math.min(item, rightMin[idx + 1]);
    }, null);
    
    
    a.forEach((item, idx) => {
        if(item > leftMin[idx] && item > rightMin[idx]) return;
        
        answer++;
    })
    
    return answer;
}