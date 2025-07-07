function solution(beginning, target) {
    /*
        초기 상태에서 목표상태가 되기 위한 동전 뒤집기 횟수의 최솟값
        목표 상태를 만들지 못하면 -1
        
        행, 열을 뒤집는 순서는 최종 결과에 영향을 주지 않음
        
        요소의 첫번째를 기준으로, 4가지 경우가 존재 
        
        '같다' 라는 말은 target의 첫번째 요소와 같다는 의미
        
        행 첫번째 요소가 같을 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 같을 때 뒤집기
        행 첫번째 요소가 같을 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 다를 때 뒤집기
        행 첫번째 요소가 다를 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 같을 때 뒤집기
        행 첫번째 요소가 다를 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 다를 때 뒤집기
        
        배열을 target과 다른 부분만 1로, 같은 부분은 0으로 표시
    */
    

    const rowSize = target.length;
    const columnSize = target[0].length;
    const flagArr = new Array(rowSize).fill().map(() => new Array(columnSize).fill(0));
    
    for(let i = 0; i < rowSize; i++) {
        for(let j = 0; j < columnSize; j++) {
            if(beginning[i][j] !== target[i][j]) flagArr[i][j] = 1;
        }
    }
    
    let [min, tempCnt] = [Infinity, 0];
    const isSolved = (copyFlag) => copyFlag.every((row) => row.every((flag) => flag === 0));
    // 행 첫번째 요소가 같을 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 같을 때 뒤집기
    let copyArr = JSON.parse(JSON.stringify(flagArr));
    
    for(let i = 0; i < rowSize; i++) {
        if(copyArr[i][0] === 1) continue;
        
        tempCnt++;
        for(let j = 0; j < columnSize; j++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    
    for(let j = 0; j < columnSize; j++) {
        if(copyArr[0][j] === 1) continue;
        
        tempCnt++;
        for(let i = 0; i < rowSize; i++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    if(isSolved(copyArr)) min = Math.min(min, tempCnt);
    
    // 행 첫번째 요소가 같을 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 다를 때 뒤집기
    tempCnt = 0;
    copyArr = JSON.parse(JSON.stringify(flagArr));
    for(let i = 0; i < rowSize; i++) {
        if(copyArr[i][0] === 1) continue;
        
        tempCnt++;
        for(let j = 0; j < columnSize; j++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    
    for(let j = 0; j < columnSize; j++) {
        if(copyArr[0][j] === 0) continue;
        
        tempCnt++;
        for(let i = 0; i < rowSize; i++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    if(isSolved(copyArr)) min = Math.min(min, tempCnt);
    
    // 행 첫번째 요소가 다를 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 같을 때 뒤집기
    tempCnt = 0;
    copyArr = JSON.parse(JSON.stringify(flagArr));
    for(let i = 0; i < rowSize; i++) {
        if(copyArr[i][0] === 0) continue;
        
        tempCnt++;
        for(let j = 0; j < columnSize; j++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    
    for(let j = 0; j < columnSize; j++) {
        if(copyArr[0][j] === 1) continue;
        
        tempCnt++;
        for(let i = 0; i < rowSize; i++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    if(isSolved(copyArr)) min = Math.min(min, tempCnt);
    // 행 첫번째 요소가 다를 때 뒤집고, 뒤집은 후에 열의 첫번째 요소가 다를 때 뒤집기
    tempCnt = 0;
    copyArr = JSON.parse(JSON.stringify(flagArr));
    for(let i = 0; i < rowSize; i++) {
        if(copyArr[i][0] === 0) continue;
        
        tempCnt++;
        for(let j = 0; j < columnSize; j++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    
    for(let j = 0; j < columnSize; j++) {
        if(copyArr[0][j] === 0) continue;
        
        tempCnt++;
        for(let i = 0; i < rowSize; i++) {
            copyArr[i][j] = 1 ^ copyArr[i][j];
        }
    }
    if(isSolved(copyArr)) min = Math.min(min, tempCnt);
    
    return min === Infinity ? -1 : min;
}