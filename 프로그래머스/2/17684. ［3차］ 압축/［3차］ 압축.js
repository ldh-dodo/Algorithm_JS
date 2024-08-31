function solution(msg) {
    let dict = {}
    let answer = [];
    let dict_num = 27; 

    for(let i = 0; i < 26; i++){
        const letter = String.fromCharCode(65 + i);
        dict[letter] = i + 1;
    }
    
    let temp = 0;
    while(msg.length > 0){
        temp++;
        let w;
        let added_str;
        for(let i = 1; i < msg.length+1; i++){
            const substr = msg.substring(0, i);
            if(!dict[substr]){
                added_str = substr;
                break;
            }
            w = substr;
            
            // 사전에서 현재 입력과 일치하는 가장 긴 문자열 w 찾기.
        }
        // w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w 제거

        answer.push(dict[w]);    
        msg = msg.replace(w, '');
    
        // 다음 글자가 남아있다면, 사전에 등록한다.
        if(w !== added_str){
            dict[added_str] = dict_num;
            dict_num++;
        }
        
    }
    return answer;
}