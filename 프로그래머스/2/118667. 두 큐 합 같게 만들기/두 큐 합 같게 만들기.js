function solution(queue1, queue2) {
    const q = [...queue1, ...queue2];
    const n = queue1.length;
    const total = q.reduce((acc, cur) => acc + cur, 0);
    const target = total / 2;

    if(total % 2 !== 0) return -1;
    
    let left = 0;
    let right = n;
    let sum = queue1.reduce((acc, cur) => acc + cur, 0);
    let count = 0;
    
    while(count <= n * 3) {        
        if(sum === target) return count;
        else if(sum > target) {
            sum -= q[left % q.length];
            left++;
        } else if(sum < target) {
            sum += q[right % q.length];
            right++;
        }
        
        count++;
    }
    
    return -1;
}