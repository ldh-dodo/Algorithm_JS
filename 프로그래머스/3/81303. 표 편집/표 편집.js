
class Node {
    constructor(cur, prev, next) {
        this.cur = cur;
        this.prev = prev;
        this.next = next;
    }
}

function solution(n, k, cmd) {
    /*
    "U X" : 선택된 행 X칸 위 행 선택
    "D X" : 선택된 행 X칸 아래 행 선택
    "C" : 1. 현재 선택된 행 삭제 2. 바로 아래 행 선택(마지막 행이면 바로 위 행 선택)
    "Z" : 가장 최근에 삭제된 행을 원래대로 복구. 선택된 행 변경 X
    */
    
    // 각 노드는 [자신의 왼쪽 노드 인덱스, 자신의 오른쪽 노드 인덱스] 를 가진다.
    let nodes = Array(n);
    let st = [];
    
    for(let i = 0; i < n; i++) {
        nodes[i] = new Node(i, i - 1, i + 1);
    }
    nodes[0].prev = null
    nodes[n - 1].next = null
    
    cmd.forEach((command) => {
        const [action, count] = command.split(' ');
        
        switch(action) {
            case 'U' :
                for(let i = 0; i < Number(count); i++) k = nodes[k].prev;
                break;
            case 'D' :
                for(let i = 0; i < Number(count); i++) k = nodes[k].next;
                break;
            case 'C' :
                st.push(k);
                let currentNode = nodes[k];
                let nextNode = currentNode.next !== null ? nodes[currentNode.next] : null
                let prevNode = currentNode.prev !== null ? nodes[currentNode.prev] : null;
                
                if(prevNode !== null) prevNode.next = currentNode.next;
                if(nextNode !== null) nextNode.prev = currentNode.prev;

                k = currentNode.next !== null ? currentNode.next : currentNode.prev;
                break;
            case 'Z' :
                const rollbackIdx = st.pop();
                let rollbackNode = nodes[rollbackIdx];
                let rollbackNextNode = 
                    rollbackNode.next !== null ? nodes[rollbackNode.next] : null;
                let rollbackPrevNode = 
                    rollbackNode.prev !== null ? nodes[rollbackNode.prev] : null;
                
                if(rollbackNextNode) rollbackNextNode.prev = rollbackIdx;
                if(rollbackPrevNode) rollbackPrevNode.next = rollbackIdx;       
                break;           
        }
    });

    let answer = Array(n).fill('O');
    
    st.forEach((deletedIdx) => {
        answer[deletedIdx] = 'X';
    });

    answer = answer.join('');
    
    return answer;
}