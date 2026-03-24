function solution(tickets) {
    /*
    모든 공항 : 알파벳 대문자 3글자
    3 <= 공항수 <= 10000
    
    항공권 모두 사용해야함
    경로 2개 이상일 경우, 알파벳 오름차순
    */
    
    let answer = ['ICN'];
    const visited = Array(tickets.length).fill(false);
    
    tickets.sort(((a, b) => a[1].localeCompare(b[1])));
        
    backtracking(new Set(tickets).size);
    
    function backtracking(n) {      
        function dfs(path, cur) {
            if(answer.length !== 1) return;
            if(path.length === n) {
                answer.push(...path);
                return;
            }
            
            for(let i = 0; i < tickets.length; i++) {
                if(visited[i]) continue;
                if(tickets[i][0] !== cur) continue;
                
                const [st, end] = tickets[i];
    
                path.push(end);
                visited[i] = true;
                dfs(path, end);
                path.pop();
                visited[i] = false;
            }
        }
        
        dfs([], 'ICN');
    }
    
    return answer;
}