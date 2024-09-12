function solution(prices) {
    /*
    O(N^2)은 시간 초과일듯 (prices.length 가 최대 100,000)    
    뒤 큰수 찾기랑 비슷한 예제?
    뒤 작은수 찾기로 변형해보자
    */
    let answer = new Array(prices.length).fill(0);
    
    for(let i = 0; i < answer.length; i++){
        answer[i] = answer.length - i - 1;
    }
    let st = [];
    
    for(let i = 0; i < prices.length; i++){
        while(st.length > 0 && prices[st[st.length - 1]] > prices[i]){
            answer[st[st.length-1]] = i - st[st.length-1];
            st.pop();
        }        
        st.push(i);
    }

    return answer;
}