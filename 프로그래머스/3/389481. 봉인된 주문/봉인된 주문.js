function solution(n, bans) {
    /*
    - 각 주문은 알파벳 소문자 11글자 이하이다.
    - 글자수 적은 주문 먼저 기록
    - 글자수 같다면, 사전 순 기록
    - 몇몇 주문 삭제되었고, 주문서에서 n번째 주문을 찾아야 함
    */
    // 26^1 ~ 26 ^ 11 
    const BASE_26 = 26;
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    let answer = "";
    let len = 1;
    const stringToIndex = (str) => [...str].reduce((acc, cur) => acc * BASE_26 + cur.charCodeAt(0) - 96, 0);
    
    while(n > 26 ** len) {
        len++;
    }

   bans.sort((a,b) => {
       if(a.length === b.length) return a.localeCompare(b);
       return a.length - b.length;
   });
    
    
    for(const ban of bans) {
        if(ban.length > len) break;
        if(n >= stringToIndex(ban)) n++;
    }
    
    while(len > 0) {
        answer = alpha[(n - 1) % BASE_26] + answer;
        n = Math.floor((n - 1) / BASE_26);
        len--;
    }
    
    return answer;
}