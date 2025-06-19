function solution(n, bans) {
    /*
    주문은 알파벳 소문자로만 구성된다.
    주문은 최대 11글자 이다.
    주문은 정렬된 상태이다.
    
    글자수가 적은 주문부터 기록된다.
    글자수가 같다면, 사전 순대로 기록된다.
    
    해당 주문서에서, 주문이 삭제된 후의 n번째 주문을 구하라.
    
    1 2 .. 26 27 ... 52 53 ... 676 
    a b    z  aa     az ba     zz
    
    1 ~ 26^1 = 1자리
    26^1 + 1 ~ 26^2 = 2자리
    26^2 + 1 ~ 26^3 = 3자리
    */
    
    let answer = '';
    const BASE = 26;
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    let len = 1;
    const stringToAsciiIdx = 
          (str) => [...str].reduce((acc, cur) => BASE * acc + cur.charCodeAt() - 96, 0); 
    
    while(n > BASE ** len) len++;
    
    bans.sort((a, b) => {
        if(a.length === b.length) return a.localeCompare(b);
        return a.length - b.length;
    });
    
    bans = bans.map((ban) => ban.split(''));
    bans = bans.map(stringToAsciiIdx);
    
    for(const ban of bans) {
        if(n < ban) break;
        n++;
    }
    
    while(len > 0) {
        answer = alpha[(n - 1) % BASE] + answer;
        n = Math.floor((n - 1) / BASE);
        len--;
    }
    
    return answer;
}