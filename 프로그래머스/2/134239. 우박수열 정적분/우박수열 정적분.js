function solution(k, ranges) {
    let arr = [[0, k]]; 
    let i = 1;
    const area = [];
    const result = [];
    const prefixSum = [];
    
    while(k > 1) {
        k = (k % 2 === 0) ? k / 2 : 3 * k + 1;
        arr.push([i++, k]);
    }

    for(let i = 0; i < arr.length - 1; i++) {
        // (i, arr[i], i + 1, arr[i + 1]) 넓이 계산
        area.push((arr[i][1] + arr[i + 1][1]) / 2);
    }
    
      
    const n = arr.length - 1;
    
    prefixSum[0] = 0;
    for(let i = 0; i < n; i++) prefixSum[i+1] = prefixSum[i] + area[i];
  
    for(let [a, b] of ranges) {
        const end = n + b;
        
        if(a > end) result.push(-1);
        else if(a === end) result.push(0);
        else result.push(prefixSum[end] - prefixSum[a]);
    }
    
    return result;
}