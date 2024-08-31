class Stack {
    constructor(){
        this.top = 0;
        this.arr = [];
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
    size(){
        return this.arr.length;
    }
}
function solution(numbers) {
    // 정수배열 numbers
    
    // 뒷 큰수 : 자신보다 뒤에있고 && 자신보다 큼 && 가장 가까이 있음
    
    // 가장 간단한 아이디어, max값을 뽑고, 2중 for문을 통해,현재 원소가 max가 아니면 뒤에있는 원소만 검사하면서, 순회 -> 입력값이 1,000,000라 시간 초과 날 확률이 높을듯 ? -> Yes
    
    let answer = new Array(numbers.length).fill(-1);
    let st = new Stack();
    
    for(let i = 0; i < numbers.length; i++){
        while(st.size() > 0 && numbers[st.peek()] < numbers[i]){
            answer[st.pop()] = numbers[i];
        }
        st.push(i);
    }
    
    return answer;
}