function solution(q, location) {
    let head = 0;
    let answer = 0
    
    // 최적화 방법
    // sorted를 통해서, 현재의 최고 target을 구하자.
    // 현재는 slcie, map때문에 O(N^2)이 되어 비효율적.
    
    const sorted = [...q].sort((a, b) => b - a);
    
    q = q.map((num, idx) => [num, idx]); // [priority, idx];
    while(head < q.length) {
        const [prty, idx] = q[head++];
        
        console.log(prty, idx);
        if(prty !== sorted[answer]) {
            q.push([prty, idx]);
            continue;
        }
        
        answer++;
        if(idx === location) return answer;
    }
}