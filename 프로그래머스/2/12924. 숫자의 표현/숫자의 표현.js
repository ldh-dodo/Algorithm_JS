function solution(n) {
    let answer = 1;
    
    for(let i = 1; i <= parseInt(n / 2, 10); i++){
        let sum = 0;
        let num = i;
        while(1){
            sum+=num;
            
            if(sum > n){
                break;
            }
            
            if(sum === n){
                answer++;
                break;
            }
            
            num++;
        }
    }
    return answer;
}