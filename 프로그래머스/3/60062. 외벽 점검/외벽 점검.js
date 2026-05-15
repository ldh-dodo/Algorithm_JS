function solution(n, weak, dist) {
    /*
    외벽 총 둘레 : n미터
    취약 지점 손상되지 않았는지 점검. 점검 시간 1시간
    최소한의 친구들을 투입. 친구들은 외벽을 따라서만 이동
    weak : 취약지점 위치(오름차순). 전부 다름
    dist : 각 친구가 1시간 동안 이동할 수 있는 거리
    return : 취약 지점을 점검하기 위해 보내야 하는 친구 수의 최소값. 
    
    1 <= n <= 200
    1 <= weak.length <= 15
    0 <= weak[x] <= n - 1
    1 <= dist.length <= 8
    1 <= dist[x] <= 100
    */
    
    
    /*
    n: 12
    0 1 2 3 4 5 6 7 8 9 10 11 0 11 10 9 8 7 6 5 4 3 2 1 
    
    투입할 친구는 전부 취약지점에서 시작하면 됨
    친구 배치를 순열로 만들어서
    */
    let answer = -1;
    
    // 반시계 방향까지 포함
    const weakLen = weak.length;
    const added = [];
    
    for(let i = 0; i < weakLen; i++) weak.push(weak[i] + n);
    
    
    
    for(let i = 1; i <= dist.length; i++) {
        const perms = permutation(dist, i);

        for(let j = 0; j+weakLen <= weak.length; j++) {
            const sliced = weak.slice(j, j+weakLen);
            
            for(const perm of perms) {
                let idx = 0;
                
                for(const distIdx of perm) {
                    const reach = sliced[idx] + dist[distIdx];
                    while(idx < weakLen && sliced[idx] <= reach) idx++;
                    if(idx === weakLen) break;
                }
                
                if(idx === weakLen) return i;
            }
        }
    }
    
    
    return answer;
}

function permutation(arr, n) {
    const result = [];
    const visited = Array(arr.length).fill(false);
    
    function dfs(path) {
        if(path.length === n) {
            result.push([...path]);
            return;
        }
        
        for(let i = 0; i < arr.length; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            path.push(i);
            
            dfs(path);
            
            visited[i] = false;
            path.pop();
        }
    }
    
    dfs([]);
    
    return result;
}