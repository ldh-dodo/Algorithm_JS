function solution(str1, str2) {
    let answer = 0;
    
    let pattern = /[a-zA-Z]/;
    let c_str1 = {};
    let c_str2 = {};
    
    // 영문으로 된 글자 쌍만, 대문자 또는 소문자로 통일해서 넣기.
    // 1. 문자열 처리
    for(let i = 0; i < str1.length; i++){
        if(!pattern.test(str1[i+1])){
            i++;
            continue;
        } else if(!pattern.test(str1[i])) {
            continue;      
        }   else {
            let sliceStr = str1.substring(i, i+2);
            if(sliceStr.length <= 1) continue;
            sliceStr = sliceStr.toUpperCase();
            c_str1[sliceStr] = (c_str1[sliceStr] | undefined) + 1;
        }        
    }

    for(let i = 0; i < str2.length; i++){
        if(!pattern.test(str2[i+1])){
            i++;
            continue;
        } else if(!pattern.test(str2[i])){
            continue;
        } else {
            let sliceStr = str2.substring(i, i+2);
            if(sliceStr.length <= 1) continue;
            
            sliceStr = sliceStr.toUpperCase();
            c_str2[sliceStr] = (c_str2[sliceStr] | undefined) + 1;
        }        
    }
    
    // 2. 자카드 유사도 계산
    /*
    유의점
    1. 두 집합 모두 공집합시 자카드 유사도는 1
    2. 중복 허용
    */
    const keys = Object.keys(c_str1);    
    const keys2 = Object.keys(c_str2);
    
    if(keys.length === 0 && keys2.length === 0){
        return 65536;
    }
    /*
    합집합
    a 배열 돌면서 같은게 있으면, max값 더하기. 같은게 없으면 자기 자신만 더해주기
    같은게 없었던 것 만큼 count 해주고, length - count 만큼 더해주기(b배열과의 합집합)
    FR AN CE
    1 + 1+ 1+ 3-2 = 4
    1 + 1 + 1 + 1 4-4 = 4
    
    교집합
    a배열 돌면서 같은게 있으면, min값 더해주기.
    
    하나의 반복문에서 처리
    */

    let intersect = 0;
    let union = 0;
    let c_str1_length = 0;
    let c_str2_length = 0;
    
    for(let key of keys) {
        c_str1_length += c_str1[key];
        if(c_str1[key] && c_str2[key]){
            intersect+= Math.min(c_str1[key], c_str2[key]);
        }
    }
    
    for(let key of keys2){;
        c_str2_length += c_str2[key];
    }
    union = c_str1_length + c_str2_length - intersect;
    answer = Math.floor(65536 * (intersect / union));
    
    return answer;
}