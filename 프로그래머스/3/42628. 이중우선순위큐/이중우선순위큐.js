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
            
            if(this.heap[parent] <= this.heap[i]) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            
            i = parent;
        }
    }
    
    peek() {
        return this.heap[0];
    }
    
    pop() {
        if(this.heap.length === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        let i = 0;
        
        while(true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            
            if(left < this.heap.length && this.heap[left] < this.heap[smallest]) 
                smallest = left;
            if(right < this.heap.length && this.heap[right] < this.heap[smallest])
                smallest = right;
            if(smallest === i) break;
            
            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }
        
        return top;
    }
}

function solution(operations) {
    /*
    MinHeap으로 정렬해두고, 
    최소 값은 root값을, 
    최대값은 마지막 level에 있는 걸 활용
    */
    
    const pq = new MinHeap();
    
    for(const [op, str] of operations.map((line) => line.split(' '))) {
        if(op === 'I') {
            pq.push(Number(str));
        } else if(op === 'D') {
            if(pq.size() === 0) continue;
            
            if(str === '-1') {
                pq.pop();
            } else {
                const lastIdx = pq.size() - 1;
                const parentIdx = (lastIdx - 1) >> 1;
                const lastArr = pq.heap.slice(parentIdx + 1);
                let maxIdx;
                let max = -Infinity;
                
                for(let i = 0; i < lastArr.length; i++) {
                    if(lastArr[i] > max) {
                        maxIdx = parentIdx + 1 + i;
                        max = lastArr[i];
                    }
                }
                
                [pq.heap[lastIdx], pq.heap[maxIdx]] = [pq.heap[maxIdx], pq.heap[lastIdx]];
                pq.heap.pop();
            }
        }
    }
    
    if(pq.size() === 0) return [0, 0];
    
    return [Math.max(...pq.heap.slice(((pq.size() - 2) >> 1) + 1)), pq.peek()];
}   