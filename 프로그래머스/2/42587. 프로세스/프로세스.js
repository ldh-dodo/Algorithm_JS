function solution(prty, idx) {
    let answer = 0;
    
    while(prty.length !== 0){
        let firstItem = prty[0];
        let max = Math.max(...prty);
        
        if(max !== firstItem){ // 첫번째 요소가 최댓값이 아닐 때
            idx = (idx - 1 >= 0) ? idx-1 : prty.length -1;
            prty.shift(); // 첫번째 요소 제거
            prty.push(firstItem); // 맨 뒤에 추가
        } else { // 첫번째 요소가 최댓값일 때
            answer++;
            prty.shift();
            if(idx === 0){//첫번째 요소가 찾고자 하는 위치일 때
                break;
            } 
            --idx;
        }
    }
  
    return answer;
}