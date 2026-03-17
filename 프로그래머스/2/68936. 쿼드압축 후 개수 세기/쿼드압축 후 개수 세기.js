function solution(arr) {
    /*
    0과 1로 이루어진 2^n 2^n 2차원 배열
    
    1. 영역 내 모든 수 같은 값 -> 압축 
    2. 같지 않으면 영역을 4개로 쪼갬
    3. 반복
    
    배열에 최종적으로 남는 0의 개수와 1의 개수를 배열에 담아서 return
    answer : [0의 개수, 1의 개수]
    */
    const count = {};
    count[0] = 0;
    count[1] = 0;
    
    const n = arr.length;
    compress(0, 0, n);
    
    return [count[0], count[1]];
    function compress(y, x, size) {
        if(isSame(y, x, size)) {
            count[arr[y][x]]++;
            return;
        }
        
        const nextSize = size / 2;
        
        compress(y, x, nextSize);
        compress(y, x + nextSize, nextSize);
        compress(y + nextSize, x, nextSize);
        compress(y + nextSize, x + nextSize, nextSize);
    }
        
    function isSame(y, x, size) {
        const first = arr[y][x];

        for(let i = y; i < y + size; i++) {
            for(let j = x; j < x + size; j++) {
                if(first !== arr[i][j]) return false;
            }
        }
        
        return true;
    }   
}