function solution(n, k, cmd) {
    /*
    U X : 현재 선택 행에서 X칸 Up
    D X : 현재 선택 행에서 X칸 Down
    C : 현재 선택 행 삭제, 바로 아래 행 선택(마지막이면 바로 위)
    Z : 가장 최근에 삭제된 행을 원래대로 복구(선택된 행 그대로)
    */
    
    class Node {
        constructor(cur, prev, next) {
            this.cur = cur;
            this.prev = prev;
            this.next = next;
        }
        

    }
    
    const list = [];
    const st = [];
    
    for(let i = 0; i < n; i++) {
        const prev = i - 1 < 0 ? null : i - 1;
        const next = i + 1 >= n ? null : i + 1;
        list.push(new Node(i, prev, next));        
    }
    
    for(const command of cmd) {
        const [com, dist] = command.split(' ');
        
        switch(com) {
            case 'U':
                for(let i = 0; i < Number(dist); i++) k = list[k].prev;
                break;
            case 'D' :
                for(let i = 0; i < Number(dist); i++) k = list[k].next;
                break;
            case 'C':
                st.push(k);
                let curNode = list[k];
                let nextNode = curNode.next !== null ? list[curNode.next] : null;
                let prevNode = curNode.prev !== null ? list[curNode.prev] : null;

                if(prevNode !== null) prevNode.next = curNode.next;
                if(nextNode !== null) nextNode.prev = curNode.prev;

                k = curNode.next !== null ? curNode.next : curNode.prev;
                break;
            case 'Z' :
                const rollbackIdx = st.pop();
                let rollbackNode = list[rollbackIdx];
                let rollbackNextNode = 
                    rollbackNode.next !== null ? list[rollbackNode.next] : null;
                let rollbackPrevNode = 
                    rollbackNode.prev !== null ? list[rollbackNode.prev] : null;
                
                if(rollbackNextNode) rollbackNextNode.prev = rollbackIdx;
                if(rollbackPrevNode) rollbackPrevNode.next = rollbackIdx;
                break;
        }
    }
    
    let answer = Array(n).fill('O');
    
    st.forEach((deletedIdx) => {
        answer[deletedIdx] = 'X';
    });

    answer = answer.join('');
    
    return answer;
}