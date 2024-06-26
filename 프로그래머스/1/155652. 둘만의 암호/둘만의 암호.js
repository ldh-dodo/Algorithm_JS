function solution(s, skip, index) {
    var answer = '';
    let a = 'a';
    let skip_ascii = [];
    let answer_ascii = [];
    
    for(let i = 0; i< skip.length; i++){
        skip_ascii.push(skip[i].charCodeAt());
    }
    //console.log(skip_ascii);
    let check = 0;
    
    for(let i = 0; i <  s.length; i++) {
        check = 0;
        let s_temp = s[i].charCodeAt();
        while(check < index){
            s_temp+= 1;
            if(s_temp > 122) {
                s_temp = 97; // z보다 1이 커질 경우, a로 변환
            }
            
            if(!skip_ascii.includes(s_temp)){
                check++;
            }
        }
        answer_ascii.push(s_temp);
    }
    //console.log(answer_ascii);
    for(let i = 0; i<answer_ascii.length; i++){
        answer+= String.fromCharCode(answer_ascii[i]);
    }
    //console.log(answer);
    return answer;
}