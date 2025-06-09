function solution(numbers) {
    /*
    살펴본 노드가 더미 노드라면 문자열 뒤에 0을 추가한다.
    살펴본 노드가 더미 노드가 아니라면 문자열 뒤에 0을 추가한다.
    문자열에 저장된 이진수를 십진수로 변환한다.
    
    수가 주어졌을 때 하나의 이진트리로 해당 수를 표현할 수 있는지를 판별
    
    풀이 전략
    - 주어진 십진수를 이진수로 변환한 뒤, 이진트리로 표현할 수 있는지를 확인한다.
    - 이진수 1 부분의 조건
        - 부모가 1이어야 함.
    - 이진수 0 부분의 조건
        - 부모의 조건에 따라 상관이 없음
        - 부모가 0이어야 함.
    */
    
    const result = [];
    
    for(let number of numbers) {
        number = number.toString(2);
        
        let length = 2 ** (Math.floor(Math.log2(number.length)) + 1) - 1; // 2^h - 1
        number = number.padStart(length, "0");
        
        if(canParse(number, 0, number.length - 1)) result.push(1);
        else result.push(0);    
    }
    
    function canParse(number, left, right) {
        if(left === right) return true;
        
        const mid = Math.floor((left + right) / 2);
        const canParseLeft = canParse(number, left, mid - 1);
        
        if(!canParseLeft) return false;
        
        const canParseRight = canParse(number, mid + 1, right);
        
        if(!canParseRight) return false;
        
        const leftChild = number[Math.floor((left + mid) / 2)];
        const rightChild = number[Math.ceil((mid + right) / 2)];
        
        if(leftChild === '1' || rightChild === '1') { // 자식이 1이라면, 자기 자신도 1이어야 함.
            if(number[mid] === '1') return true;
            return false;
        }
        
        return true;
    }
    
    return result;
}