function solution(n, words) {
    let answer = [1, 1];
    let lastChar = words[0][0];
    let flag = false;
    let check = [];

    for(let i = 0; i < words.length; i++){
        if(lastChar !== words[i][0]){
            flag = true;
            break;    
        }
        if(check[words[i]] !== undefined){
            flag = true;
            console.log('확인', check[words[i]]);
            break;
        }
        check[words[i]] = 1;
        answer[0]++;
        lastChar = words[i][words[i].length - 1];
        if(answer[0] > n){
            answer[0] = 1;
            answer[1]++;
        }
    }
    
    if(!flag){
        answer = [0, 0];
    }
    
    return answer;
}