function solution(k, tangerine) {
    let answer = 0;
    let obj = {};
    let arr = [];
    console.log(tangerine);
    for(let i = 0; i < tangerine.length; i++){
        if(obj[tangerine[i]] === undefined){
            obj[tangerine[i]] = 0;
        }
        obj[tangerine[i]]++;
    }

    arr= Object.entries(obj);
    arr.sort((a, b) => b[1] - a[1]);
    
    let sortedValues = arr.map(value => value[1]);
    
    let sum = 0;
    for(let i = 0; i < sortedValues.length; i++){
        console.log(sortedValues[i]);
        sum+= sortedValues[i];
        if(sum > k || sum === k){
            return ++answer;
            continue;
        }
        answer++;
    }
}