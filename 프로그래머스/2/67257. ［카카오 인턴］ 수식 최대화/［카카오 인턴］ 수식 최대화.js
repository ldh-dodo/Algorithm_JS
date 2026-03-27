function solution(exp) {
    /*
    상금 지급 방식
    
    숫자, + - * 만으로 이루어진 연산 수식 전달
    연산자의 우선순위를 자유롭게 재정의하여 절댓값이 가장 큰 숫자를 제출
    */
    
    function permutation(arr, n) {
        const visited = Array(n).fill(false);
        const path = [];
        
        function cal(num1, num2, op) {
            if(op === '*') return num1 * num2;
            else if(op === '+') return num1 + num2;
            else if(op === '-') return num1 - num2;
        }
        
        function calExp(opArr) {
            const prty = {};
            const numSt = [];
            const opSt = [];
            
            opArr.forEach((op, idx) => {
                prty[op] = opArr.length - idx;
            });
            
            for(const el of split) {
                if(el === '-' || el === '*' || el === '+') {
                    const prevOp = opSt[opSt.length - 1];
                    
                    while(opSt.length > 0 && 
                         prty[opSt[opSt.length - 1]] >= prty[el] &&
                         numSt.length >= 2) {
                        
                        const a = numSt.pop();
                        const b = numSt.pop();
                        const res = cal(b, a, opSt.pop());
                        
                        numSt.push(res);
                    }
                    
                    opSt.push(el);
                } else { // number
                    numSt.push(el);
                }
            }
            while(opSt.length) {
                const a = numSt.pop();
                const b = numSt.pop();
                const op = opSt.pop();
                
                numSt.push(cal(b, a, op));
            }
            
            return Math.abs(numSt[0]);
        }
        
        function dfs(path) {
            if(path.length === n) {
                max = Math.max(calExp(path), max);
                return;
            }
            
            for(let i = 0; i < arr.length; i++) {
                if(visited[i]) continue;
                
                visited[i] = true;
                path.push(arr[i]);
                dfs(path);
                visited[i] = false;
                path.pop();
            }
        }
        
        dfs([]);
    }
    
    let max = -Infinity;
    let op = new Set();
    const split = [];
    let temp = '';
    
    for(let i = 0; i < exp.length; i++) {    
        if(exp[i] === '-' || exp[i] === '*' || exp[i] === '+')  {
            op.add(exp[i]);
            split.push(Number(temp));
            split.push(exp[i]);
            temp = '';
        }
            
        else temp += exp[i];
        
        if(i === exp.length - 1) split.push(Number(temp));
    }
    
    op = [...op];

    permutation(op, op.length);
    
    return max;
}