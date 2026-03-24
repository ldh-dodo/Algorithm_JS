function solution(n) {
    // n을 124 나라의 진법으로 바꿔라 
    // 1 2 4 : 3
    // 11 12 14 21 22 24 41 42 44 : 9 
    // 111 112 114 121 122 124 141 142 144  : 27
    // 3^n개 -> 3진법. 단 0을 4로 바꿔야함

    /*
    나머지 1 : 1
    나머지 2 : 2
    나머지 0 : 4 -> 0을 4로 바꾸면 값이 커지기 때문에, 보정필요. 몫에서 -1
    */
    
    let answer = '';
    
    while(n > 0) {
        let remain = n % 3;
        n = Math.floor(n / 3);
        
        if(remain === 0) {
            answer = '4' + answer;
            n--;
        } else if(remain === 1) {
            answer = '1' + answer;
        } else if(remain === 2) {
            answer = '2' + answer;
        }
    }
    
    return answer;
}