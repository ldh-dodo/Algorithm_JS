function solution(q, location) {
    let head = 0;
    let answer = 0;
    
    q = q.map((num, idx) => [num, idx]); // [priority, idx];
    while(head < q.length) {
        const max = Math.max(...q.slice(head).map(([prty, idx]) => prty))

        const [prty, idx] = q[head++];

        if(prty !== max) {
            q.push([prty, idx]);
            continue;
        }
        
        answer++;
        if(idx === location) return answer;
    }
}