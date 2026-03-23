class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;
        
        while(i > 0) {
            const parent = (i - 1) >> 1;
            
            if(this.heap[parent][1] <= this.heap[i][1]) break;
            
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }
    
    pop() {
        if(this.heap.length === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        let i = 0;
        
        while(true) {
            let smallest = i;
            const left = (2 * i) + 1;
            const right = (2 * i) + 2;
            
            if(left < this.heap.length && this.heap[left][1] < this.heap[smallest][1]) 
                smallest = left;
            if(right < this.heap.length && this.heap[right][1] < this.heap[smallest][1])
                smallest = right;
            if(i === smallest) break;
            
            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }
        
        return top;
    }
}

function dijkstra(graph, N, start) {
    const pq = new MinHeap();
    const dist = Array(N + 1).fill(Infinity);
    dist[start] = 0;
    
    pq.push([start, 0]); // [node, cost];
    
    while(pq.size()) {
        const [cur, cost] = pq.pop();
        console.log(cur, cost);
        if(cost > dist[cur]) continue;
        
        for(const [next, w] of graph[cur]) {
            const newCost = cost + w;
            
            if(newCost < dist[next]) {
                dist[next] = newCost;
                pq.push([next, newCost]);
            }
        }
    }
    
    return dist;
}

function solution(N, road, K) {
    /*
    1번 마을에서 N개의 마을 중 K 시간 이하로 배달이 가능한 마을에서만 주문을 받는다 
    */
    
    const graph = Array.from({length: N + 1}, () => []);
    for(const [u, v, w] of road) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    };
    
    const dist = dijkstra(graph, N, 1);
    
    return dist.filter((d) => d !== Infinity && d <= K).length;
}