function solution(orders, course) {
    let answer = [];
    const hash = {};
    
    for(const order of orders) {
        const arr = order.split('').sort((a, b) => a.localeCompare(b));
         
        combination(arr, arr.length);
    }
    
    for(const n of course) {
        const maxArr = [];
        let max = -Infinity;
        
        for(const [key, value] of Object.entries(hash)) {
            if(key.length !== n || value < 2) continue;
            
            if(value > max) {
                max = value;
                maxArr.length = 0;
                maxArr.push(key);
            } else if(value === max) {
                maxArr.push(key);
            }
        }
        
        answer.push(...maxArr);
    }
    
    answer.sort((a, b) => a.localeCompare(b));
    
    function combination(arr, n) {
        function dfs(path, start) {
            if(path.length >= 2) {
                const key = path.join('');
                hash[key] = (hash[key] || 0) + 1;
            }

            if(path.length === n) {
                return;
            }

            for(let i = start; i < arr.length; i++) {
                path.push(arr[i]);
                dfs(path, i + 1);
                path.pop();
            }
        }
    
    dfs([], 0);
}
    
    return answer;
}
