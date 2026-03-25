function solution(sequence) {
    let max1 = -Infinity, max2 = -Infinity;
    let sum1 = 0, sum2 =0;
   
    for(let i = 0; i < sequence.length; i++) {
        const num = sequence[i];
        
        const num1 = num * (i % 2 === 0 ? 1 : -1);
        sum1 = Math.max(num1, sum1 + num1);
        max1 = Math.max(sum1, max1);
        
        const num2 = num * (i % 2 === 0 ? -1 : 1);
        sum2 = Math.max(num2, sum2 + num2);
        max2 = Math.max(sum2, max2);
    }
    
    return Math.max(max1, max2);
}