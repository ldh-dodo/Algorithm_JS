function solution(numbers) {
    numbers = numbers.split('').map(Number);
    let answer = 0;
    const set = new Set();
    
    for(let i = 1; i <= numbers.length; i++) {
        const result = permutation(numbers, i);
        result.forEach((num) => set.add(num));
    }
    
    for(const number of set) {
        if(isPrime(number)) {
                answer++;
         }
    } 
    
    function isPrime(number) {
        if(number === 0 || number === 1) return false;
        
        for(let i = 2; i <= Math.sqrt(number); i++) {
            if(number % i === 0) return false;
        }
        
        return true;
    }
    
    function permutation(arr, n) {
        const result = new Set();
        const visited = Array(n).fill(false);

        function dfs(path) {
            if(path.length === n) {
                result.add(Number(path.join('')));
                return;
            }
            
            for(let i = 0; i < arr.length; i++) {
                if(visited[i]) continue;
                
                visited[i] = true;
                path.push(arr[i]);
                dfs(path);
                path.pop();
                visited[i] = false;
            }
        }
        
        dfs([]);
        
        return result;
    }
    
    return answer;
}