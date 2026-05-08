function solution(s) {
    /*
    x를 최대한 사전 순으로 앞에 오도록 만들어라.
    110을 뽑아서 임의의 위치에 다시 삽입하는 행동만 허용한다.
    
    풀이
    110의 개수를 센다.
    적절한 위치에 삽입한다.
    
    1. 어느 위치에 들어가야 사전 순으로 가장 앞인가?    
     - 마지막으로 0이 나오는 부분의 인덱스를 기억하고, 그 뒤에 삽입. 0이 없다면 맨 앞에
     - 100 -> 100110
     - 1 -> 1101
    2. 110의 개수를 어떻게 셀 것인가?
     - 스택을 통해서 O(N) 만에 구하자.
    
    */
    
    const result = [];
    
    for(const str of s) {
        let cnt = 0;
        const st = [];
        
        // 110 개수 세기
        for(const c of str) {
            if(st[st.length - 2] === '1' && st[st.length - 1] === '1' && c === '0') {
                cnt++;
                
                st.pop();
                st.pop();
                continue;
            }
            
            st.push(c);
        }
        
        // 삽입할 위치 찾기
        
        let lastZeroIdx = -1;
        const insertedStr = '110'.repeat(cnt);
        
        for(let i = 0; i < st.length; i++) {
            if(st[i] === '0') lastZeroIdx = i;
        }
            
        const rest = st.join('');
    
        if(lastZeroIdx === -1) {
            result.push(insertedStr + rest);
        } else {
            result.push(rest.slice(0, lastZeroIdx + 1) + insertedStr + rest.slice(lastZeroIdx + 1));
        }
    }
    
    0111

    return result;
}