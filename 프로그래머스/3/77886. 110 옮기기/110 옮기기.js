function solution(s) {
    const answer = [];
    const TARGET_STRING = '110';
    
    for(const str of s) {
        const st = [];
        let cnt = 0;
        
        for(const char of str) {
            if(st.length >= 2 &&
                st[st.length - 1] === '1' &&
                st[st.length - 2] === '1' &&
                char === '0') {
                
                st.pop();
                st.pop();
                cnt++;
                continue;
            } 
            st.push(char);
        }
        
        let insertIdx = 0;
        
        st.forEach((char, idx) => {
            if(char === '0') insertIdx = idx + 1;
        })
        
        const res = 
              st.slice(0, insertIdx).join('') + 
              TARGET_STRING.repeat(cnt) +
              st.slice(insertIdx).join('');
        
        answer.push(res);
    }
    
    return answer;
}