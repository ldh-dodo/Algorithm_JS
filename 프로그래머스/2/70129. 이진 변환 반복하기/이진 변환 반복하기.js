function solution(s) {
    var answer = [];
    
    let zeroCount = 0;
    let transCount = 0;
    
    
    while(s != '1'){
        let tempStr = '';    
        for(let i = 0; i < s.length; i++){
            if(s[i] == '0'){
                zeroCount++;        
            } else {
                tempStr+=s[i];
            }
        }
        s = tempStr.length.toString(2);
        transCount++;
    }
    
    answer = [transCount, zeroCount];
    return answer;
}