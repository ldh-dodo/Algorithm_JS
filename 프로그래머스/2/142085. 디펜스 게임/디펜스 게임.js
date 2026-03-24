class MaxHeap {
    constructor() {
        this.heap = [];
    }    
    
    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;
        
        while(i > 0) {
            const parent = (i - 1) >> 1;
            
            if(this.heap[parent] >= this.heap[i]) break;
            
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
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            
            if(left < this.heap.length && this.heap[left] > this.heap[largest]) 
                largest = left;
            if(right < this.heap.length && this.heap[right] > this.heap[largest])
                largest = right;            
            if(i === largest) break;
            
            [this.heap[largest], this.heap[i]] = [this.heap[i], this.heap[largest]];
            i = largest;
        }
        
        return top;
    }
}

function solution(n, k, enemy) {
    /*
    병사 n명으로 적의 공격을 순서대로 막기
    매 라운드마다 적 등장
    
    남은 병사 수 < 적의 수 -> 게임 종료
    무적권 사용 : 병사 소모 X, 한 라운드 공격 막을 수 있음
    
    return : 막을 수 있는 라운드
    
    
    무적권을 최대한 많은 적이 나오는 라운드에 사용해야함.
    enemy 내림차순 ? -> 내 병사 5, 적 : [2,2,2, 10, 10], k : 1 인 경우, 10에 무적권을 쓰지못함. 순서를 바꿔선 안됨
    
    현재 라운드를 깨지 못하는데, 무적권이 존재한다면, 바로 무적권을 써야함
      
    enemy를 지나가면서, n < enemy이라면, pq에서 max값을 n에 더하고, k를 1줄인다.
    무적권을 소모해서, 해당 라운드의 병사만큼을 늘린다는 아이디어.
    */
    
    const pq = new MaxHeap();
    let round = 0;
    
    for(const e of enemy) {
        pq.push(e);
        
        if(n < e) {
            if(k > 0) {
                k--;
                n += pq.pop();
            } else return round;
        }
        
        if(n >= e) {
            n -= e;
        }
        
        round++;
    }
    
    return round;
}