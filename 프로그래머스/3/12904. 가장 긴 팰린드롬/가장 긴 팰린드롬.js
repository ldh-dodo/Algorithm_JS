function solution(s)
{
    /*
        부분 문자열의 팰린드롬을 구하라
    1. 모든 요소를 중심으로 삼는다.
    2. 중심으로부터 왼쪽 오른쪽을 비교해나가며, 팰린드롬의 최대 길이를 찾는다.
    */

    let answer = 1;
    const len = s.length;
    
    for(let i = 0; i < len; i++) {
        let left = i - 1;
        let right = i + 1;

        while(left >= 0 && right < len && s[left] === s[right]) {
            answer = Math.max(answer, (right - left + 1));
            left--;
            right++;
        }
        
        left = i;
        right = i + 1;
        
        while(left >= 0 && right < len && s[left] === s[right]) {
            answer = Math.max(answer, (right - left + 1));
            left--;
            right++;
        }
    }
    
    return answer;
}