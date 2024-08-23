function dfs(numbers, idx, answerArr, target, sum, depth){
    sum+= numbers[idx];
    if(depth === numbers.length - 1){
        if(sum === target){
            answerArr[0]++;
            return;
        } else {
            return;
        }
    }
    
    // 1 + 1 + 1 + 1 에서 -1을 더할 때.. idx는 4. depth는 4
    // numbers[4]
    /*
    1. idx가 가리키는 numbers 요소를 sum에 더한다.
    2. sum과 target이 같다면, answerArr[0]에 1씩 더해준다.
    3. sum과 target이 같지 않더라도, depth가 numbers 요소의 개수만큼 도달하면 반복문을 종료한다. 
    4. 부호 치환을 위해, 각 idx마다 두번의 dfs를 실행한다.
    */
    dfs(numbers, idx+1, answerArr, target, sum, depth+1);
    
    
    numbers[idx+1] = -numbers[idx+1];
    dfs(numbers, idx+1, answerArr, target, sum, depth+1);
}

function solution(numbers, target) {
    let answerArr = [0];
    
    dfs(numbers, 0, answerArr, target, 0, 0); // 첫번째 요소의 부호 치환을 위해 dfs 두번.
    
    numbers[0] = -numbers[0];
    dfs(numbers, 0, answerArr, target, 0, 0);
    
    return answerArr[0];
}