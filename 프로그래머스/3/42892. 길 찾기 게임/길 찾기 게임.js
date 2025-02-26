class Node {
    constructor(key, value, left, right) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    insert(key, value, curNode = this.root) {
        if(this.root === null) {
            this.root = new Node(key, value, null, null);
            return;
    }
        
        // if(key === curNode.key) {
        //     // update
        // } // 현재 문제에서는 해당 없음
        
        if(key < curNode.key) { // 현재 노드의 왼쪽에 삽입
            if(curNode.left === null) 
                curNode.left = new Node(key, value, null, null);
            else
                this.insert(key, value, curNode.left); 
        }
        
        if(key > curNode.key) { // 현재 노드의 오른쪽에 삽입
            if(curNode.right === null)
                curNode.right = new Node(key, value, null, null);
            else
                this.insert(key, value, curNode.right);
        }
    }
    
    preOrder(node = this.root, result = []) {
        if(node === null) return result;
        
        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);
        
        return result;
    }
    
    postOrder(node = this.root, result = []) {
        if(node === null) return result;
        
        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.value);
        
        return result;
    }
}

function solution(nodeinfo) {
    /*
    1. nodeinfo에 이진 트리를 구성하는 각 노드의 정보가 담겨있다.
    2. 완전 이진트리를 구성하고, 전위 순회, 후위 순회한 결과를 2차원 배열에 담아 반환하자.
    */
    let answer = [];
    
    nodeinfo = nodeinfo.map((data, key) => [...data, key + 1]);
    nodeinfo.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]);
    
    nodeinfo = nodeinfo.map((info) => [info[0], info[2]]);

    let bst = new BST();
    
    
    nodeinfo.forEach(([key, value]) => {
        bst.insert(key, value);
    })
    
    answer.push(bst.preOrder());
    answer.push(bst.postOrder());
    
    return answer;
}