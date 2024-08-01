class Stack{
    constructor(){
        this.arr = [];
        this.top = 0;
    }
    push(item){
        this.arr[this.top++] = item;
    }
    pop(){
        if(this.top <= 0) return null;
        return this.arr[--this.top];
    }
    peek(){
        if(this.top <=0 ) return null;
        return this.arr[this.top - 1];
    }
}

function solution(s)
{
    let answer = 0;
    let st = new Stack();
    
    // 0. 문자열 길이가 0이면 제거 된 것. 길이가 1이면 제거 못함.
    // 1. 가장 처음으로 알파벳이 2개 붙어있는 짝을 제거
    // 2. 반복
    // 3. 문자열 모두 제거 가능시 1 아닐시 0 반환
    
    for(let i = 0; i < s.length; i++){
        if(st.top > 0 && st.peek() === s[i]){
            st.pop();
        } else {
            st.push(s[i]);
        }
    }
    if(st.top === 0) answer = 1;
    
    return answer;
}