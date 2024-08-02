


function solution(brown, yellow) {
    
    const getDivisors = (num) => {
    const divisors = [];
    for(let i = 1; i<= Math.sqrt(num); i++){
        if(num % i === 0){
            divisors.push(i);
            if(num / i !== i){
                divisors.push(num / i);
            }
        }
    }
    return divisors;
}
    let answer = [];
    
    let sum = brown + yellow;
    
    const divisors = getDivisors(sum);
    divisors.sort((a,b) => a - b);
    
    for(let i = 0; i < divisors.length; i++){
        for(let j = 0; j < divisors.length; j++){
            if(divisors[i] >= divisors[j]){
                let mul = divisors[i] * divisors[j];
                
                if(mul === sum){
                    // if sum === 12,
                    // 12 1, 6 2, 4 3
                    const checkAnswer = ((divisors[i]-2) * (divisors[j]-2) === yellow)
                    if(checkAnswer){
                        answer = [divisors[i], divisors[j]];
                        break;
                    }
                }
            }
        }
    }

    return answer;
}