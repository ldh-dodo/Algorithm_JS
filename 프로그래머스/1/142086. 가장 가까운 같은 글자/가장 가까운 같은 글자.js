function solution(s) {
    var answer = [];
    let flag;
    
    for(let i = 0; i < s.length; i++) {
        flag = false;
        for(let j = i-1; j >= 0; j--) {
            if(s[j] === s[i]){
                answer.push(i-j);
                flag = true;
            }
            if(flag) {
                break;
            }
        }
        if(!flag){
            answer.push(-1);
        }
    }
    return answer;
}