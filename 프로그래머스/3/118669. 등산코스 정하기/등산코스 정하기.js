class MinHeap {
    constructor() {
        this.heap = [];
    }    
    
    size () { return this.heap.length; }
    
    push(val) {
        this.heap.push(val);
        
        let i = this.heap.length - 1;
        
        while(i > 0) {
            const parent = (i - 1) >> 1;
            
            if(this.heap[parent][0] <= this.heap[i][0]) break;
            
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
            const left = (i * 2) + 1;
            const right = (i * 2) + 2;
            
            if(left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if(right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            
            if(i === smallest) break;
            
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
        
        return top;
    }
}

function solution(n, paths, gates, summits) {
    const graph = Array.from({length: n + 1}, () => []); 
    const isSummit = new Set(summits);
    const isGate = new Set(gates);
    
    for(const [i, j, w] of paths) {
        graph[i].push([j, w]);
        graph[j].push([i, w]);
    }
    
    const intensity = Array(n + 1).fill(Infinity);
    const pq = new MinHeap();
    
    // 멀티소스: 모든 출입구를 한 번에 투입
    for(const gate of gates) {
        intensity[gate] = 0;
        pq.push([0, gate]);
    }
    
    let minIntensity = Infinity;
    let minSummit = Infinity;
    
    while(pq.size()) {
        const [prevI, cur] = pq.pop();
        
        if(prevI > intensity[cur]) continue;
        
        if(isSummit.has(cur)) {
            if(prevI < minIntensity || (prevI === minIntensity && cur < minSummit)) {
                minIntensity = prevI;
                minSummit = cur;
            }
            continue;
        }
        
        for(const [next, w] of graph[cur]) {
            if(isGate.has(next)) continue;
            
            const newI = Math.max(prevI, w);
            if(newI < intensity[next]) {
                intensity[next] = newI;
                pq.push([newI, next]);
            }
        }
    }
    
    return [minSummit, minIntensity];
}