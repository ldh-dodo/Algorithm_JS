function solution(s) {
    let answer = [];
    let hash = {};
    let s_Arr = [];
    s = s.replaceAll('{', '');
    s = s.replaceAll('}', '');
    s = s.split(',');

    for(let i = 0; i < s.length; i++){
        hash[s[i]] = (hash[s[i]] | undefined) + 1;
    }
    s_Arr = Object.entries(hash);
    s_Arr.sort((a,b) => b[1] - a[1]); 
    
    for(let i = 0; i < s_Arr.length; i++){
        answer.push(Number(s_Arr[i][0]));
    }
    return answer;
}