function solution(number, k) {
    const st = [];
    for(const num of number.split('').map(Number)) {
        while(k > 0 && st.length && st[st.length - 1] < num) {
            st.pop();
            k--;
        }
        st.push(num);
    }
    
    if(k > 0) return st.slice(0, st.length - k).join('');
    return st.join('');
}