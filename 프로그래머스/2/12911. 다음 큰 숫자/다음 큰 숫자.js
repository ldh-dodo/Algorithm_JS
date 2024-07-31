function oneCount(arr){
    let cnt = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === '1'){
            cnt++;
        }
    }
    return cnt;
}

function solution(n) {
    let answer = 0;
    const MAX = 1000000;
    
    let nBinary = n.toString(2);
    let nOneCount = oneCount(nBinary);
    
    for(let i = n+1; i < MAX; i++){
        let iBinary = i.toString(2);
        let cmpCount = oneCount(iBinary);
        if(cmpCount === nOneCount){
            answer = i;
            break;
        }
    }
    return answer;
}