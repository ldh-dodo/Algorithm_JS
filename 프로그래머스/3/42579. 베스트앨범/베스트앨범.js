function solution(genres, plays) {
    /*
    1. genres를 순회하며 각 장르별 plays 합 정리, 
    2. 
    */
    let answer = [];
    let sumHash = {}; // [genre : plays 총 합]
    let musicHash = {};
    
    let len = genres.length;
    
    for(let i = 0; i < len; i++){
        let genre = genres[i];
        sumHash[genre] = (sumHash[genre] | 0) + plays[i];
        
        musicHash[genre] = musicHash[genre] || [];
        musicHash[genre] = [...musicHash[genre], i];
    }
    
    let sorted_sumHash = Object.entries(sumHash);
    sorted_sumHash.sort(([, valueA], [, valueB]) => valueB - valueA);
    
    for(let i = 0; i < sorted_sumHash.length; i++){
        let genre = sorted_sumHash[i][0];
        let numberArr = musicHash[genre];
        
        let tempHash = {};
        for(let j = 0; j < numberArr.length; j++){
            let num = numberArr[j];
            
            tempHash[num] = plays[num];
        }
        let sorted_tempHash = Object.entries(tempHash);
        sorted_tempHash.sort(([num1, value1], [num2, value2]) => {
            if(value1 === value2){
                return num1 - num2;
            }
            return value2 - value1;
        });
        
        for(let i = 0; i < 2; i++){
            if(sorted_tempHash[i]){
                answer.push(Number(sorted_tempHash[i][0]));
            }
        }
    }
    return answer;
}