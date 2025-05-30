class Node {
    constructor(x, num, left = null, right = null) {
        this.x = x;
        this.num = num;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    insert(newX, num, curNode = this.root) {
        if(this.root === null) {
            this.root = new Node(newX, num);
            return;
        }
        
        if(newX < curNode.x) {
            if(curNode.left === null) {
                curNode.left = new Node(newX, num);
            } else {
                this.insert(newX, num, curNode.left);
            }
        } else if(newX > curNode.x) {
            if(curNode.right === null) {
                curNode.right = new Node(newX, num);
            } else {
                this.insert(newX, num, curNode.right);
            }
        }   
    }
    
    preorder(cur = this.root, result = []) {
        if(cur === null) return;
        
        result.push(cur.num);
        this.preorder(cur.left, result);
        this.preorder(cur.right, result);
        
        return result;
    }
    
    postorder(cur = this.root, result = []) {
        if(cur === null) return;
        
        this.postorder(cur.left, result);
        this.postorder(cur.right, result);
        result.push(cur.num);
        
        return result;
    }
}

function solution(nodes) {
    /*
    [x, y]
    x값은 모두 다르다.
    같은 레벨에 있는 노드는 같은 y좌표를 가진다.
    
    x값을 기준으로 bst를 만들자.
    
    bst
    y값이 큰 순서대로 정렬
    모든 요소를 삽입
    순회
    */
    
    let answer = [];
    const bst = new BST();
    
    nodes = nodes.map((el, idx) => [...el, idx + 1]);
    
    nodes.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]);
    
    for(const [x, y, num] of nodes) {
        bst.insert(x, num);
    }
    
    answer = [bst.preorder(), bst.postorder()];
    
    
    return answer;
}