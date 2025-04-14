function solution(beginning, target) {
    const rowLen = beginning.length;
    const colLen = beginning[0].length;
    let [res1, res2, res3, res4] = [0, 0, 0, 0];
    let flagArr = Array.from({length : rowLen}, () => Array.from({length : colLen}, () => 0));
    // beginning과 target이 서로 다른 요소는 1, 같은 요소는 0으로.
    for(let i = 0; i < rowLen; i++) {
        for(let j = 0; j < colLen; j++) {
            if(beginning[i][j] !== target[i][j]) {
                flagArr[i][j] = 1;
            }
        }
    }

    // 행 다른 것 -> 열 다른 것
    let copyFlag = JSON.parse(JSON.stringify(flagArr));

    for(let i = 0; i < rowLen; i++) {
        if(copyFlag[i][0] === 0) continue;

        res1++;

        for(let j = 0; j < colLen; j++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }
    
    for(let j = 0; j < colLen; j++) {
        if(copyFlag[0][j] === 0) continue;

        res1++;

        for(let i = 0; i < rowLen; i++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }

    let isSolved1 = copyFlag.every((row) => row.every((flag) => flag === 0));

    // 열 다른 것 -> 행 다른 것
    copyFlag = JSON.parse(JSON.stringify(flagArr));

    for(let j = 0; j < colLen; j++) {
        if(copyFlag[0][j] === 0) continue;

        res2++;

        for(let i = 0; i < rowLen; i++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }
    for(let i = 0; i < rowLen; i++) {
        if(copyFlag[i][0] === 0) continue;

        res2++;

        for(let j = 0; j < colLen; j++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }

    const isSolved2 = copyFlag.every((row) => row.every((flag) => flag === 0));

    // 행 안다른 것 -> 열 다른 것
    copyFlag = JSON.parse(JSON.stringify(flagArr));

    for(let i = 0; i < rowLen; i++) {
        if(copyFlag[i][0] === 1) continue;

        res3++;

        for(let j = 0; j < colLen; j++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }

    for(let j = 0; j < colLen; j++) {
        if(copyFlag[0][j] === 0) continue;

        res3++;

        for(let i = 0; i < rowLen; i++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }

    const isSolved3 = copyFlag.every((row) => row.every((flag) => flag === 0));
    
    // 열 안다른 것 -> 행 다른 것
    copyFlag = JSON.parse(JSON.stringify(flagArr));

    for(let j = 0; j < colLen; j++) {
        if(copyFlag[0][j] === 1) continue;

        res4++;

        for(let i = 0; i < rowLen; i++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }

    for(let i = 0; i < rowLen; i++) {
        if(copyFlag[i][0] === 0) continue;

        res4++;

        for(let j = 0; j < colLen; j++) {
            copyFlag[i][j] = 1 ^ copyFlag[i][j];
        }
    }

    const isSolved4 = copyFlag.every((row) => row.every((flag) => flag === 0));
    
    if(!isSolved1) res1 = Infinity;
    if(!isSolved2) res2 = Infinity;
    if(!isSolved3) res3 = Infinity;
    if(!isSolved4) res4 = Infinity;
    
    const min = Math.min(res1, res2, res3, res4);
    
    return min === Infinity ? -1 : min;
}
