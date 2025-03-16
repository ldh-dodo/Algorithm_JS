function solution(operations) {
    let pq = new MinHeap();
    
    for(const operation of operations) {
        let [op, num] = operation.split(' ');
        let isDeleteMin = false;
        num = parseInt(num);
        
        if(op === 'I') {
            pq.insert(num);
        } else if(op === 'D') {
            pq.remove(num === 1);
        }
    }

    return pq.returnResult();
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }
    
    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    
    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        
        while(currentIndex > 0) {
            let parentIndex = this.getParentIndex(currentIndex);
            
            if(this.heap[currentIndex] >= this.heap[parentIndex]) break;
            
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
              this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
                smallerChildIndex = rightChildIndex;
            }
            
            if(this.heap[currentIndex] <= this.heap[smallerChildIndex]) break;
            
            this.swap(currentIndex, smallerChildIndex);
            currentIndex = smallerChildIndex;   
        }
    }
    
    insert(val) {
        this.heap.push(val);
        this.heapifyUp();
    }
    
    remove(isDeleteMax) {
        if(this.isEmpty()) {
            return null;
        }
        
        if(isDeleteMax) {
            const parentIndex = this.getParentIndex(this.heap.length - 1);
            const lastLeafNodes = this.heap.slice(parentIndex + 1);
            
            let maxIndex = 0;

            for(let i = 1; i < lastLeafNodes.length; i++) {
                if(lastLeafNodes[i] > lastLeafNodes[maxIndex]) maxIndex = i;
            }
            
            this.swap(parentIndex + 1 + maxIndex, this.heap.length - 1);
            return this.heap.pop();
        }
        
        let min = this.heap[0];
        let last = this.heap.pop();
        
        if(!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        
        return min;
    }
    
    returnResult() {
        if(this.isEmpty()) return [0,0];
        if(this.heap.length === 1) return [this.heap[0], this.heap[0]];
        
        let parentIndex = this.getParentIndex(this.heap.length - 1);
        let lastLeafNodes = this.heap.slice(parentIndex + 1);
        let maxValue = Math.max(...lastLeafNodes);
        
        return [maxValue, this.heap[0]];
    }
}