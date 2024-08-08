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
        if(this.top <= 0) return null;
        return this.arr[this.top - 1];
    }
    isEmpty(){
        if(this.top <= 0) {
            return true;   
        }
        return false;
    }
    clear(){
        this.top = 0;
    }
}


function solution(s) {
    let answer = 0;
    let st = new Stack();
    let closeBracket = [']', ')', '}'];
    let openBracket = ['[', '(', '{'];
        
    for(let i = 0; i < s.length; i++){ // 회전
        let st = new Stack();
        let flag = false;
        
        let idx;
        
        for(let j = 0; j < s.length; j++) { // 검사
            idx = (i+j) >= s.length ? (i+j-s.length) : (i+j);

            if(openBracket.includes(s[idx])){ 
                st.push(s[idx]);
                continue;
            }

            if(st.peek() === s[idx]){
                st.pop();
                continue;
            }
            
            
            if(st.isEmpty() && (closeBracket.includes(s[idx]))){
                flag = true;
                break;
            }

            if(closeBracket.includes(s[idx])){
                if(st.isEmpty()){
                    flag = true;
                    break;
                } else {
                    if(st.peek() === '[' && s[idx] === ']'){
                        st.pop();
                        continue;
                    }
                        if(st.peek() === '{' && s[idx] === '}'){
                        st.pop();
                        continue;
                    }
                        if(st.peek() === '(' && s[idx] === ')'){
                        st.pop();   
                        continue;
                    }
                }
            }
 
        }
        if(!flag && st.isEmpty()){
            answer++;
        }
        st.clear();
    }
    
    return answer;
}