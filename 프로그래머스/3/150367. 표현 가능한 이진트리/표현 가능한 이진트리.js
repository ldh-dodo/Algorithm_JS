function solution(numbers) {
    /*
    높이에 상관없이 왼쪽노드부터 오른쪽 노드부터 살핀다.
    L -> root -> R 순서(중위 순회)

    살펴본 노드가 더미 노드 -> 문자열 뒤에 0, 아니라면 1
    문자열에 저장된 이진수를 십진수로 변환
    
    수가 주어졌을 때 하나의 이진트리로 해당 수를 표현할 수 있는가?
    
    수 -> 자리수가 2^x인 이진수로 변환
    해당 이진수가 이진트리로 변환될 수 있는지 판단
    
    
    자식 노드가 1이라면 부모가 반드시 1
    자식 노드가 0이라면 부모 상관 X
    
    부모가 1이라면 검사 X
    
    
    */
    const result = [];
    
    for(const number of numbers) {
        if(number === 1) {
            result.push(1);
            continue;
        }
        
        // 자리수 맞추기
        const bin = number.toString(2);
        let size = 1;
        while (size < bin.length) size = size * 2 + 1;
        
        const parsed = number.toString(2).padStart(size, '0');
    
        if(check(0, size-1, parsed)) result.push(1);
        else result.push(0);
    }
    
    return result;
}

function check(l, r, number) {
    if(l > r) return true;
    
    const mid = Math.floor((l + r) / 2);
    const leftChild = number[Math.floor(l + (mid - 1)) / 2];
    const rightChild = number[Math.floor((mid + 1) + r) / 2];
          
    if(number[mid] === '0') {
        if(leftChild === '1' || rightChild === '1') {
            return false;
        }
    } 
    
    return check(l, mid - 1, number) && check(mid + 1, r, number);
}