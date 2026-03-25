function solution(w) {
    /*
    균형잡힌 괄호 문자열 : 여는괄호 개수 === 닫는 괄호 개수
    올바른 괄호 문자열: 균형잡힌 괄호 문자열 + 괄호의 짝이 모두 맞는 경우
    */
    
    // 1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다. 
    if(w === '') return '';
    if(isRight(w)) return w;
    
    // 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다. 
    // 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다.
    
    const { u, v } = split(w);
    
    if(isRight(u)) {
        return u + solution(v);
    } else {
        let temp = '(' + solution(v) + ')';
        const reverse = u.slice(1, u.length - 1).split('').map((c) => c === '(' ? ')' : '(').join('');
        return temp + reverse;
    }
    
    
    console.log(u ,v);
    
    function isRight(str) {
        const st = [];
        
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '(') st.push(str[i]);
            else if(str[i] === ')') {
                if(st.length === 0) return false;
                st.pop();
            }
        }
        
        return st.length === 0 ? true : false;
    }
    
    function split(str) {
        let cnt = 0;
        let u = '';
        let v = '';
        
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '(') cnt++;
            else cnt--;

            u += str[i];

            if(cnt === 0) {
                v = str.slice(i + 1);
                break;
            }
        }
        
        if(cnt === 0) return { u, v };
    }
}