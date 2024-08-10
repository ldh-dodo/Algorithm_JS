function solution(want, number, discount) {
    let answer = 0;
    let hashArr = {};
    
    for(let i = 0; i < 10; i++){
        hashArr[discount[i]] = (hashArr[discount[i]] || 0) + 1;
    }
    
    if(want.every((item, i) => number[i] === hashArr[item])){
        answer++;
    }
    for(let i = 10; i < discount.length; i++){
        hashArr[discount[i-10]]--;
        hashArr[discount[i]] = (hashArr[discount[i]] || 0) + 1;
        
        if(want.every((item, i) => number[i] === hashArr[item])){
            answer++;
        }   
    }
    
    return answer;
}