function solution(arr1, arr2) {
    /*
        1 4     3 3         i행xj열 합
        3 2     3 3         
        4 1
        
        3 3
        3 3
    */
    // arr1 크기를 m x a
    // arr2 크기를 a * n
    
    // arr1 * arr 크기는 m * n
    
    let m = arr1.length;
    let n = arr2[0].length;
    let a = arr1[0].length;
    
    let answer = new Array(m).fill(0).map(()=> new Array(n));
    
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            let item = 0;
            for(let u = 0; u < a; u++){
                item += arr1[i][u] * arr2[u][j];
            }
            answer[i][j] = item;
        }
    }

    return answer;
}