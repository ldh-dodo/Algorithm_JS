
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
    
    remove() {
        if(this.isEmpty()) return null;
        
        const min = this.heap[0];
        const last = this.heap.pop();
        
        if(!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();        
        }
        
        return min;
    }
    
    peek() {
        if(!this.isEmpty()) {
            return this.heap[0];
        }
    }
    
    heapifyDown() {
        let currentIdx = 0;
        
        while(this.getLeftChildIdx(currentIdx) < this.heap.length) {
            let smallerChildIdx = this.getLeftChildIdx(currentIdx);
            let rightChildIdx = this.getRightChildIdx(currentIdx);
            
            if(rightChildIdx < this.heap.length && 
              this.heap[rightChildIdx][1] < this.heap[smallerChildIdx][1]) {
                smallerChildIdx = rightChildIdx;
            }
            
            if(this.heap[smallerChildIdx][1] >= this.heap[currentIdx][1]) break;
            
            this.swap(smallerChildIdx, currentIdx);
            currentIdx = smallerChildIdx;
        }
    }
    
    heapifyUp() {
        let currentIdx = this.heap.length - 1;
        
        while(currentIdx > 0) {
            let parentIdx = this.getParentIdx(currentIdx);
            
            if(this.heap[parentIdx][1] <= this.heap[currentIdx][1]) break;
            
            this.swap(currentIdx, parentIdx);
            currentIdx = parentIdx;
        }
    }
        
    isEmpty() {
        return this.heap.length === 0;
    }
    
    getParentIdx(i) {
        return Math.floor((i - 1) / 2);
    }
    
    getLeftChildIdx(i) {
        return i * 2 + 1;
    }
    
    getRightChildIdx(i) {
        return i * 2 + 2;
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    
    size() {
        return this.heap.length;
    }
}

function solution(n, paths, gates, summits) {
    /*
    산 지점에는 1 부터 n 까지의 번호가 붙어있다.
    지점은 [출입구, 쉼터, 산봉우리] 의 종류 중 하나이다.
    각 지점은 양방향 그래프이다.
    처음와 끝의 출입구가 같아야 함
    처음부터 끝까지 단 하나의 출입구만 이용해야 함
    
    휴식없이 이동해야 하는 시간 중 가장 긴 시간이 intensity이다.
    매 지점마다 휴식해야 하기 때문에, 한 번의 이동이 결국 intensity라고도 할 수 있음
    
    왕복가능하면서 intensity가 최소로 되게끔 하는 경우를 구해야 함.
    반환 값은 [산봉우리 번호, intensity 최솟값]
    
    gates : 출입구
    summits : 산봉우리
    
    풀이 전략
    - 총 비용이 중요한 것이 아님, 따라서 출입구 -> 봉우리 까지의 최소 intensity를 구하면 정답.
    - intensity를 갱신하면서, 현재의 intensity가 이전까지의 최대 intensity보다 크다면 가지치기
    - 단순 dfs를 이용하면 시간초과가 날 것 같음.
    - 각 지점마다의 최소 intensity가 중요하지만, 최소라고 해서 반드시 봉우리에 도달할 수 있는 것은 아니기에 최소가 아닌 경우도 탐색할 수 있어야 함
    - 최소 힙을 이용
    
    로직
    - 양방향 그래프를 구성한다.
    - 최소 힙에 모든 gate를 삽입한다.
    - 
    - dfs, 가지치기를 통해 intensity를 갱신하며 봉우리까지 순회한다.
    - 요구조건에 맞게 봉우리에 도착했다면, [산봉우리 번호, intensity 최솟값] 을 반환한다.
    - intensity가 최소로 같다면, 산봉우리 번호가 가장 낮은 등산코스를 선택
    */
    
    let answer = [];
    let graph = new Array(n + 1).fill().map(() => []);
    let intensity = new Array(n + 1).fill(Infinity);
    const summitSet = new Set(summits);
    const pq = new MinHeap();
    
    let minIntensity = Infinity;
    let minSummit = Infinity;
    
    for(const [i, j, w] of paths) {
        graph[i].push([j, w]); // 번호, 비용
        graph[j].push([i, w]);
    }

    for(const gate of gates) {
        pq.insert([gate, 0]); // 번호, 비용  
    }
    
    while(pq.size() > 0) {
        const [idx, curIntensity] = pq.remove();
        
        if(curIntensity > intensity[idx]) continue;
        if(summitSet.has(idx)) {
            if(curIntensity < minIntensity || 
              curIntensity === minIntensity && idx < minSummit) {
                minSummit = idx;
                minIntensity = curIntensity;
            }
            continue;
        }
        
        for(const [next, cost] of graph[idx]) {
            const maxIntensity = Math.max(curIntensity, cost);
            if(intensity[next] > maxIntensity) {
                intensity[next] = maxIntensity;
                pq.insert([next, maxIntensity]);
            }
        }
    }
    
    return [minSummit, minIntensity];
}