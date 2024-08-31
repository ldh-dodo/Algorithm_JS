function solution(topping) {
    let answer = 0;
    
    // 롤케이크 두조각을 한조각씩 나눠먹는다
    // "공평하게" -> 크기 < 토핑의 종류
    // 조각들의 크기, 토핑 개수와 상관 없이, 토핑 종류의 수가 같다면 "공평한 것"
    
    
    // 시간초과가 많이 발생해서, 반복울 최대한 줄이는 아이디어를 생각해보자
    
    // 1. 케이크를 먼저 각각 다음과 같이 나눠보자
    /*
        cake1 = [첫번째 토핑]
        cake2 = [두번째 토핑 ~ 마지막 토핑]
        
        2. 그리고, 두번째 토핑부터 각 토핑을 돌면서 cake2에서 빼서 cake1에 던져주는 식으로 해보자
    */
    let cake1 = {};
    let cake2 = {};
    let cake1_length = 0;
    let cake2_length = 0;
    
    // 1
    
    for(let j = 0; j < 1; j++){
        let t = topping[j];
        cake1[t] = 1;
        cake1_length++;
    }
    
    for(let j = 1; j < topping.length; j++){
        let t = topping[j];
        if(cake2[t]){
            cake2[t]++;
        } else {
            cake2[t] = 1;
            cake2_length++;
        }
    }
    
    if(cake1_length === cake2_length){
        answer++;
    }
    // 2.
    
    for(let i = 1; i < topping.length; i++){
        let t = topping[i];
        
        // cake2에는 반드시 두번째 토핑부터는 존재함. 해당 값을 null로 바꿔주고, cake1의 유무에 따라 컨트롤
        
        cake2[t]--;
        if(cake2[t] === 0){
            delete cake2[t];
            cake2_length--;
        }
        
        if(cake1[t]){ // cake1에 존재한다면 cake1[t]의 개수만 늘려주기
            cake1[t]++;
            
        } else {
            cake1[t] = 1;
            cake1_length++;
        }
        
        if(cake1_length === cake2_length){
            answer++;
        }        
    }
    
    
    return answer;
}