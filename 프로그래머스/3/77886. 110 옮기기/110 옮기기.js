function solution(str) {
    /*
    문자열은 0과 1로만 이루어져 있다.
    "110" 을 뽑아서 임의의 위치에 다시 삽입할 수 있다.
    문자열을 최대한 사전순으로 앞에 오도록 만들어야 한다.
    
    풀이 전략

    문자를 순회하는 동안, 스택에 담고, 110이 담겨있다면, 추출하는 방식으로 진행
    추출하고 남은 문자열의 가장 마지막 0 뒤에 삽입하면 사전순으로 가장 앞에 올 수 있음
    */
    
    let answer = [];
    const STR_110 = '110';
    
    for(let s of str) {
        let cnt = 0;
        let st = [];
        
        for(let i = 0; i < s.length; i++) {
            st.push(s[i]);
            
            if(st.length < 3) continue;
            
            const len = st.length;
                  
            if(st[len - 1] === '0' && st[len - 2] === '1' && st[len - 3] === '1') {
                cnt++;
                
                st.pop();
                st.pop();
                st.pop();
            }
        }
        
        // 남은 st문자열에 가장 마지막 0 뒤에 cnt만큼 110을 삽입하면 됨
        
        st = st.join('');
        
        const lastIndex = st.lastIndexOf('0');
        const result = st.slice(0, lastIndex + 1) + 
              STR_110.repeat(cnt) + st.slice(lastIndex + 1);
        
        answer.push(result);
    }

    return answer;
}