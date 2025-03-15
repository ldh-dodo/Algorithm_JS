function solution(n, paths, gates, summits) {
    const MAX_INTENSITY = 10000001;
    const graph = Array.from( {length: n + 1}, () => [] );
    
    paths.forEach(([a, b, w]) => {
        graph[a].push([b, w]);
        graph[b].push([a, w]);
    });
    
    const isSummit = new Set(summits);
    const intensity = Array(n + 1).fill(MAX_INTENSITY);
    
    const pq = new MinHeap();
    
    gates.forEach((gate) => {
        intensity[gate] = 0;
        pq.insert([0, gate]);
    });
    

    let minSummit = 200001;
    let minIntensity = MAX_INTENSITY;
    
    while(pq.size() > 0) {
        const [curIntensity, cur] = pq.remove();

        
        if(curIntensity > intensity[cur]) continue;
        if(isSummit.has(cur)) {
            if(curIntensity < minIntensity || 
               (curIntensity === minIntensity) && cur < minSummit) {
                minSummit = cur;
                minIntensity = curIntensity;
            }
            continue;
        }
        
        for(const [next, cost] of graph[cur]) {
            const maxIntensity = Math.max(curIntensity, cost);
            
            if(intensity[next] > maxIntensity) {
                intensity[next] = maxIntensity;
                pq.insert([maxIntensity, next]);
            }
        }

    }
    
    return [minSummit, minIntensity];
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    size() {
        return this.heap.length;
    }
    
    getParentIndex(idx) {
        return Math.floor((idx - 1) / 2);
    }
    
    getLeftChildIndex(idx) {
        return 2 * idx + 1;
    }
    
    getRightChildIndex(idx) {
        return 2 * idx + 2;
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    
    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        
        while(currentIndex > 0) {
            let parentIndex = this.getParentIndex(currentIndex);
            
            if(this.heap[currentIndex][0] >= this.heap[parentIndex][0]) break;
            
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    heapifyDown() {
        let currentIndex = 0;
        
        while(this.getLeftChildIndex(currentIndex) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(currentIndex);
            let rightChildIndex = this.getRightChildIndex(currentIndex);
            
            if(rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex][0] < this.heap[smallerChildIndex][0]) {
                smallerChildIndex = rightChildIndex;
            }
            
            if(this.heap[currentIndex][0] <= this.heap[smallerChildIndex][0]) break;
            
            this.swap(currentIndex, smallerChildIndex);
            currentIndex = smallerChildIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
        
    peek() {
        if(this.isEmpty()) {
            return null;
        }
        
        return this.heap[0];
    }

    remove() {
        if(this.isEmpty()) {
            return null;
        }
        
        const min = this.heap[0];
        const last = this.heap.pop();
        
        if(!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        
        return min;
    }
}