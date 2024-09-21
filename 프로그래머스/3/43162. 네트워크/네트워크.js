function solution(n, computers) {
    let answer = 0;
    let len = computers.length;
    let q = [];
    
    let checked = new Array(len).fill(false);
    
    for(let i = 0; i < len; i++){
        if(checked[i]) continue; // 방문했다면 다음 노드 탐색
        
        // 방문 안했다면 인덱스를 큐에 push 후 방문 검사, 이후 BFS.
        // 그리고 하나의 연결된 네트워크를 검사할테니, answer 1 증가
        
        q.push(i);
        checked[i] = true;
        answer++;
        
        while(q.length > 0){ // 큐가 비어있지 않을 때 동안 반복
            let j = q.pop();
            
            // idx가 가리키는 컴퓨터가 가지고 있는 연결된 네트워크 정보를 순회
            // 예를들어 idx가 0이라면, computers[0]에 연결된 노드를 체크하면서 순회한다
            for(let idx = 0; idx < len; idx++){
                if(j === idx  || checked[idx] || !computers[j][idx]) continue;
                // 자기 자신이거나, 방문했다면 pass
                
                // 아니라면 큐에 넣고 방문 체크
                q.push(idx);
                checked[idx] = true;
            }
        }
    }
    
    return answer;
}