function solution(s) {
    var answer = '';
    
    let flag = true;
    let convert_flag = false;
    
    for(let i = 0; i <s.length; i++){

        if(s[i] === ' '){
            flag = true;
            convert_flag = false;
            answer+= s[i];
            continue;
        } else if(flag){
            // 문자일 때
            if(isNaN(s[i])){
                // 첫 문자임. 대문자로 변환
                answer += s[i].toUpperCase();
                convert_flag = true;
                flag = false;
            } else { // 문자가 아닐 때,
                flag = false; // 다음 첫 문자가 나올 때까지 pass   
                answer += s[i];
            }

        } else if(!flag && convert_flag){
            // 대문자로 변환된 상태. 만약 문자라면 소문자로 변환할 것.
            if(isNaN(s[i])){
                answer += s[i].toLowerCase();
            } else {
                answer += s[i];
            }
        }  else if(!flag && !convert_flag){
        if(isNaN(s[i])){
            answer += s[i].toLowerCase();
        } else {
            answer += s[i];
        }
        } else {
            answer+= s[i];
        } 
    }
 
 
    return answer;
}