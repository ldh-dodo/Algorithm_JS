function solution(numbers) {
    let answer = [];
    let parsedStrings = [];
    
    for(const number of numbers) {
        let parsed = number.toString(2);
        let length = 2 ** (Math.floor(Math.log2(parsed.length)) + 1) - 1;
            
        parsed = parsed.padStart(length, "0");
        parsedStrings.push(parsed);
    }
    
    for (const parsedStr of parsedStrings) {
        if(parsedStr.length === 1) {
            answer.push(1);
            continue;
        }
        
        const len = parsedStr.length;

        let canMakeBT = canMakeBinaryTree(0, len - 1, [...parsedStr]) ? 1 : 0;
        
        answer.push(canMakeBT);
    }
    
    function canMakeBinaryTree(left, right, parsedArr) {
        if(left === right) return true; // 자식 노드가 없다 -> return true;
        
        // 자식 노드가 있을 때
    
        const mid = Math.floor((left + right) / 2);
        
        const isLeftCanMakeBT = canMakeBinaryTree(left, mid - 1, parsedArr);
                
        if(!isLeftCanMakeBT) return false;
        
        const isRightCanMakeBT = canMakeBinaryTree(mid + 1, right, parsedArr);
        
        if(!isRightCanMakeBT) return false;
        
        // leftHasOne || rightHasOne 이 true 인 경우
            // 자신이 1면 true, 아니면 false
        // false 인 경우
            // return true
        
        const leftChildIdx = Math.floor((left + mid) / 2);
        const rightChildIdx = Math.ceil((mid + right) / 2);
        
        if(parsedArr[leftChildIdx] === '1' || parsedArr[rightChildIdx] === '1') {
            if(parsedArr[mid] === '1') return true;
            return false;
        }
        
        return true;
    }
    
    return answer;
}