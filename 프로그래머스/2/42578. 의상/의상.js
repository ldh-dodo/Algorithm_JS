function solution(clothes) {
    let answer = 1;
    
    let obj = {};
    // 조합 문제? 인듯. 공식 알면 좋을거같음..
    // (의상 종류 중 하나 뽑는 경우 + 의상 안입는 경우-> 1) * () * .. -1(옷을 전부 안입는 경우)
    
    for(let i = 0; i<clothes.length; i++){
        if(obj[clothes[i][1]] === undefined){
            obj[clothes[i][1]] = 1;
        } else {
            obj[clothes[i][1]]++;
        }
    }
    
    let clothes_num = Object.values(obj);
    
    let sum = 1;
    
    for(let i = 0; i < clothes_num.length; i++){
        answer *= (clothes_num[i] + 1);    
    }
    answer--;
    
    return answer;
}