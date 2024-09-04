class Minheap {
	constructor() {
		this.heap = [];
	}
	
	getParentIndex(i){
		return Math.floor((i-1) / 2);
	}
	
	getLeftChildIndex(i){
		return 2 * i + 1;
	}
	
	getRightChildIndex(i){
		return 2 * i + 2;
	}
	
	insert(value) {
		this.heap.push(value);
		this.heapifyUp();
	}
	
	remove(){
		if(this.heap.length === 0) {
			return null;
		}
		
		if(this.heap.length === 1) {
			return this.heap.pop();
		}
		
		const root = this.heap[0];
		this.heap[0] = this.heap.pop();
		this.heapifyDown();
		return root;
	}
	
	isEmpty() {
		return this.heap.length === 0;
	}
	
	size() {
		return this.heap.length;
	}
	
	// 힙의 루트 값 확인
	peek() {
		if(this.heap.length === 0) {
			return null;
		}
		return this.heap[0];
	}
	
	// 힙의 맨 아래에서 위로 재정렬
	heapifyUp(){
		let index = this.heap.length - 1;
		
		while(index > 0) {
			let parentIndex = this.getParentIndex(index);
			if(this.heap[parentIndex] <= this.heap[index]) {
				break;
			}
			this.swap(index, parentIndex);
			index = parentIndex;
		}
	}
	
	// 힙의 위에서 아래로 재정렬
	heapifyDown() {
		let index = 0;
		while(this.getLeftChildIndex(index) < this.heap.length) {
				let smallerChildIndex = this.getLeftChildIndex(index);
				let rightChildIndex = this.getRightChildIndex(index);
				
				if(rightChildIndex < this.heap.length &&
						this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
							smallerChildIndex = rightChildIndex;
				}
				
				if(this.heap[index] <= this.heap[smallerChildIndex]) {
					break;
				}
				
				this.swap(index, smallerChildIndex);
				index = smallerChildIndex;
			}
	}
	
	swap(i, j){
		const temp = this.heap[i];
		this.heap[i] = this.heap[j];
		this.heap[j] = temp;
	}
}

function solution(scov, K) {
    // 모든 음식의 스코빌 지수를 K 이상으로
    // -> 어떻게? 새로운 음식을 만든다.
    // 새로운 음식 = 가장 맵지 않은 음식 스코빌 지수 + (두 번째로 맵지 않은 음식 스코빌 지수 * 2)
    // 모든 음식의 스코빌 지수가 K 이상이 되어야 함
    // 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우를 어떻게 확인할 것인가?
    // 처음 음식이 한 개인 경우는 없으므로, 한 번 이상 섞긴 함. 따라서.. answer은 항상 0보다 큼
    
    // while문을 벗어난 뒤, new_food가 K보다 작다면, 가장 마지막에 만든 새로운 음식이 K 보다 작은 것.
    // 이 때 -1 리턴
    let answer = 0;
    let len = scov.length;
    
    const pq = new Minheap();
    
    for(let i = 0; i < len; i++){
        pq.insert(scov[i]);
    }
    
    while(pq.size() > 1){
        let [food_1, food_2] = [pq.remove(), pq.remove()];
        
        if(food_1 >= K) { // 가장 작은 스코빌 지수가 K 이상이라면, 전부 K이상, break.
            break;
        }
        
        let new_food = food_1 + (food_2 * 2);
        
        answer++;  
        pq.insert(new_food);
    }
    
    if(!pq.isEmpty() && pq.peek() < K){
        return -1;
    }
    
    return answer;
}