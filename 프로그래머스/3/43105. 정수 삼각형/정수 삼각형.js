function solution(triangle) {
    let answer = 0;
    let dp = [[...triangle[0]]];
    
    
    for(let i = 1; i < triangle.length; i++){
        let row = [];
        
        for(let j = 0; j < triangle[i].length; j++){
            let [leftDpValue, rightDpValue] = [dp[i-1][j-1], dp[i-1][j]];
            if(leftDpValue && rightDpValue){
                row.push(Math.max(leftDpValue, rightDpValue) + triangle[i][j]);    
            } else if(leftDpValue){
                row.push(leftDpValue + triangle[i][j]);
            } else {
                row.push(rightDpValue + triangle[i][j]);
            }
        }
        dp.push(row);
    }
    
    answer = Math.max(...dp[dp.length-1]);
    return answer;
}