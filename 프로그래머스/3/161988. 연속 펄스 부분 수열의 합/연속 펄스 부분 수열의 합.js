function solution(sequence) {
    let answer = 0;
    
    /*
    
    펄스 수열 [1, -1, 1, -1] or [-1, 1, -1, 1]
    연속 부분 수열 x 펄스 수열 = 연속 펄스 부분 수열

    합을 누적하면서, 합이 음수가 되는 시점은 최대가 될 수 없는 경우이므로, 0으로 초기화.
    합이 양수인 시점에는 최댓값 갱신
    */
    const LEN = sequence.length;
    let [se1, se2] = [[...sequence], [...sequence]];
    
    se1 = se1.map((item, idx) => idx % 2 === 1 ? item * -1 : item);
    se2 = se2.map((item, idx) => idx % 2 === 0 ? item * -1 : item);
    
    let max = -Infinity;
    let sum = 0;
    
    for(const num of se1) {
        if(sum + num < 0) {
            sum = 0;
            continue;
        }
        
        sum += num;
        max = Math.max(max, sum);
    }
    
    sum = 0;
    
    for(const num of se2) {
        if(sum + num < 0) {
            sum = 0;
            continue;
        }
        
        sum += num;
        max = Math.max(max, sum);
    }
    
    return max;
}