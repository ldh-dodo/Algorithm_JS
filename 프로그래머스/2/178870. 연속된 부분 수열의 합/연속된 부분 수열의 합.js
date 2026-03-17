function solution(seq, k) {
    /*
    sequence: 비내림차순으로 정렬된 수열
    
    - 조건을 만족하는 부분 수열 찾기
    
    조건
    - 부분 수열의 합이 k
    - 수열이 여러개라면 짧은 순
    - 짧은 순 여러개라면 시작 인덱스 작은 순
    
    answer: [부분 수열 시작 인덱스, 부분 수열 마지막 인덱스]
    */
    let left = 0, right = 0, sum = 0;
    let answer = [-1, -1];
    let result = null;
    /*
    1 2 3 4 5
    
    left = 0, right = 0, sum = 0
    
    1 
    1 2 
    1 2 3
    1 2 3 4 -> sum > k -> left 줄이면서 k보다 작아질 때까지 반복
    
    k와 같은지 검사
    
    
    */

    while(right < seq.length) {
        sum += seq[right];
        
        while(sum > k && left <= right) {
            sum -= seq[left];
            left++;
        }
        
        if(sum === k) {
            if(result === null || (right - left) < (result[1] - result[0])) {
                result = [left, right];
            }
        }
        right++;
    }
    
    return result;
}
    