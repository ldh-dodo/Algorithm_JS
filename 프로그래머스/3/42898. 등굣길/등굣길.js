function solution(m, n, puddles) {
    /*

    조건
    1. 오른쪽 혹은 아래로만 이동
    2. puddles 좌표는 거칠 수 없음
    */
    const DIVISOR = 1000000007;
    
    let arr = new Array(n+1).fill(0).map(() => new Array(m+1).fill(0));
    arr[1][1] = 1;
    
    for(let i = 0; i < puddles.length; i++){
        let [cy, cx] = puddles[i];
        
        arr[cx][cy] = -1;
    }
    
    for(let i = 1; i <= n; i++){
        for(let j = 1; j <=m; j++){
            if(arr[i][j] === -1){
                arr[i][j] = 0;
                continue;
            }
            
            if(i > 1) arr[i][j] += arr[i-1][j];
            if(j > 1) arr[i][j] += arr[i][j-1];
            
            arr[i][j] %= DIVISOR;
        }
    }
    return arr[n][m];
}