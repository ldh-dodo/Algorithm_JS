function GCD(a, b){
    if(b === 0){
        return a;
    }
    
    return GCD(b, a % b);
}

function LCD(a, b){
    return (a * b) / GCD(a,b);
}

function solution(arr) {
    let answer = 0;
    
    while(arr.length > 1){
        let a = arr.pop();
        let b = arr.pop();
        arr.push(LCD(a,b));
    }
    
    answer = arr[0];
    return answer;
}