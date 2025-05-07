function solution(tickets) {
    const LEN = tickets.length;
    let visited = new Array(LEN).fill(false);
    let logs = [];
    let answer = [];
    
    tickets.sort();
    
    dfs("ICN", 1);
    
    function dfs(cur, depth) {
        logs.push(cur);
        
        if(depth === LEN + 1) {
            answer = logs;
            return true;
        }
        
        for(let i = 0; i < tickets.length; i++) {
            if(!visited[i] && tickets[i][0] === cur) {
                visited[i] = true;
                
                if(dfs(tickets[i][1], depth + 1)) return true;
                
                visited[i] = false;
            }
        }
        
        logs.pop();
        
        return false;
    }
    
    return answer;
}