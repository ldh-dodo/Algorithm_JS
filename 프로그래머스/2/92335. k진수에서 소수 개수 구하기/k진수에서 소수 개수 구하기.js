function isPrime(num){
    if(num <= 1){
        return false;
    }
    for(let i = 2; i * i <= num; i++){
        if(num % i === 0){
            return false;
        }
    }
    return true;
}

function solution(n, k) {
    let convert_n = n.toString(k);
    
    let result = 0;
    let slice_n = null;
    
    let i = 0;
    let j = 0;
    let idx = -1;
    
    while(convert_n.length > 0){
        idx++;
        if(convert_n[idx] === '0' || idx > convert_n.length){
            // 0을 발견하면..
            // 자를 문자열이 없다면(slice_n) i를 늘려줄 것
            // 자를 문자열이 있다면 i부터 j까지 자르고 소수인지 판단, j와 i, slice_n를 초기화 할 것
            if(j === 0){
                i++;
                continue;
            }
            // 자를 문자열이 있다면
            slice_n = convert_n.substr(i,j);
            convert_n = convert_n.substr(j+1, convert_n.length);
            // 소수인지 판단
            if(isPrime(Number(slice_n))){
                result++;
            }
            
            // 초기화
            j = 0;
            i = 0;
            slice_n = null;
            idx = -1;
            continue;
        }
            // 문자가 0이 아니라면, 오른쪽 0을 발견하기 전까지
            // j를 늘려나가면서, i부터 j까지 문자열을 자를 것.
            // 예를 들어, 2110 이라면, i는 2까지 저장되어있을 것이므로, substr(i, j+1)까지 잘라줄 것이다
            j++;
            continue;
        }
    return result;
}