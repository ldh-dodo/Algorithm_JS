function solution(n, edge) {
    /*
    요구사항
    1. 노드는 1부터 n까지 번호가 적혀있음
    2. 1번 노드에서 가장 멀리 떨어진 노드의 '갯수'를 구하기
    3. 각 노드간의 거리는 1
    */
    let answer = 0;
    let dist = new Array(n).fill(null);
    let q = [];
    
    let graph = new Array(n).fill(null).map(() => []);

    edge.forEach((item) => {
        graph[item[0]-1].push(item[1]-1);
        graph[item[1]-1].push(item[0]-1);
    }) 
    console.log(graph);
    
    // 거리 초기화 및 큐에 처음 노드 삽입
    dist[0] = 0;
    graph[0].forEach((node) => {
        dist[node] = 1;
        q.push(node);
    })
    
    let max = 0;
    
    while(q.length > 0){
        const node = q.shift();
        graph[node].forEach((adj_node) => {
            if(dist[adj_node] !== null) return;
            
            dist[adj_node] = dist[node] + 1;
            q.push(adj_node);
            
            if(dist[adj_node] > max) {
                max = dist[adj_node];
            }
        });
    }
    
    const max_dist = dist.filter((dist_node) =>  dist_node === max);

    return max_dist.length;
}