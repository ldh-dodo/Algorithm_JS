function dfs(logs, ans, ticketMap, totalCnt) {
        if(logs.length === totalCnt) {
            ans.push([...logs]);
            return;
        }
        
        const start = logs[logs.length - 1];

        const ends = ticketMap.get(start);
        
        if(ends === undefined || ends.length === 0) return;
    
        for(let i = 0; i < ends.length; i++) {
            const end = ends[i];
            ends.splice(i, 1);
            logs.push(end);
            dfs(logs, ans, ticketMap, totalCnt);
            ends.splice(i, 0, end);
            logs.pop();
        }

        return;
}

function solution(tickets) {
    

    /*
    요구사항
    1. 항상 "ICN" 공항에서 출발한다.
    2. 모든 공항은 알파벳 대문자 3글자이다.
    3. 주어진 공항 수는 3개 이상 10000개 이하이다.
    4. tickets에는 항공권 정보가 담긴 2차원 배열이며, [a,b]는 a공항에서 b공항으로 가는 항공권이 존재함을 의미한다.
    5. 주어진 항공권을 모두 사용해야 한다.
    6. 가능한 경로가 2개 이상일 경우, 알파벳 오름차순으로 반환한다.
    7. 모든 도시를 방문할 수 없는 경우는 주어지지 않는다.
    */
    
    const ticketMap = new Map();
    
    tickets.sort((ticket1, ticket2) => ticket1[1].localeCompare(ticket2));
    
    tickets.forEach((ticket) => {
        if(!ticketMap.has(ticket[0])) {
            ticketMap.set(ticket[0], [ticket[1]]);
            return;
        }
        
        ticketMap.set(ticket[0], [...ticketMap.get(ticket[0]), ticket[1]]);
    })
    const logs = ["ICN"];
    let ans = [];
    const totalCnt = tickets.length + 1;
    
    dfs(logs, ans, ticketMap, totalCnt);
    console.log(ans);
    
    ans.sort((path1 , path2) => {
        for(let i = 0; i < path1.length; i++) {
            if(path1[i] !== path2[i]){
                return path1[i].localeCompare(path2[i]);
            }
        }
        return 0;
    })
    
    return ans[0];
}