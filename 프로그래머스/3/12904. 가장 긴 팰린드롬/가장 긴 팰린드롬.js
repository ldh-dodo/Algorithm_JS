function solution(s)
{
    // 팰린드롬 : 앞뒤를 뒤집어도 똑같음
    // 부분 문자열 중 가장 긴 팰린드롬의 길이를 리턴
    
    /*
        가장 긴 문자열부터 팰린드롬 찾아서 바로 반환
        
        
    */
    
    let answer = null;
    const n = s.length;
    
    for(let i = n; i > 1; i--) { // i 길이만큼 잘라서 비교
        for(let j = 0; j + i <= n; j++) {
            let flag = true;
            for(let k = 0; k < Math.floor(i / 2); k++) {
                const st = j + k;
                const end = j + i - 1 - k;
                
                if(s[st] !== s[end]) {
                    flag = false;
                    break;
                }
            }
            if(flag) {
                return i;
            }   
        }
    }
    
    return 1;
}