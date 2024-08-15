function dfs(visited, dungeons, limit, idx, answerArr, answer){
    for(let i = 0; i < dungeons.length; i++){
        if(!visited[i] && limit >= dungeons[i][0]){
            visited[i] = true;
            answerArr.push(answer+1);
            dfs(visited, dungeons, limit - dungeons[i][1], i+1, answerArr, answer+1);
            visited[i] = false;
        } 
    }
}

function solution(limit, dungeons) {
    let answer = 0;
    let visited = Array(dungeons.length).fill(false);
    let answerArr = [];
    
    // 첫번째부터 마지막 인덱스까지 dfs를 돈다.
    dfs(visited, dungeons, limit, 0, answerArr, answer);
    answer = Math.max(...answerArr);

    return answer;
}