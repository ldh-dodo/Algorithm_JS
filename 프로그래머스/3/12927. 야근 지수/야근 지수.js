function solution(n, works) {
    /*
    야근 피로도 = (야근을 시작한 시점에서의 남은 일의 작업량)^2
    목표 : N 시간동안 피로도 최소화하면서 일하기
    ** 1시간 동안 처리할 수 있는 작업량은 1
    
    리턴 값 : 야근 피로도 최소화 값
    
    
    */
    let answer = 0;
    let len = works.length;
    works.sort((a,b) => a-b);
    
    for(let i = 0; i < n; i++){

        
        if(works[len-1] <= 0) break;
        
        works[len - 1]--;
        
        let idx = len - 1;
        for(let j = len - 2; j >=0; j--){
            if(works[j] > works[idx]){
                let temp = works[idx];
                works[idx] = works[j];
                works[j] = temp;
                
                idx = j;
            } else{
                break;
            }
        }
    }

    for(let i = 0; i < works.length; i++){
        answer+= (works[i] * works[i]);
    }
    return answer;
}