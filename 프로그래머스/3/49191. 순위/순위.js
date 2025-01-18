function solution(n, results) {
    let answer = 0;
    
    let floydArr = Array(n + 1).fill(0).map(() => new Array(n + 1).fill(false));

    results.forEach(([winner, loser]) => {
        floydArr[winner][loser] = true; 
    });
    
    for(let k = 1; k <= n; k++) {
        for(let winner = 1; winner <= n; winner++) {
            for(let loser = 1; loser <= n; loser++) {
                if(floydArr[winner][loser] ||
                (floydArr[winner][k] && floydArr[k][loser])) {
                    floydArr[winner][loser] = true;
                }
            }
         }
    }
    
    let checked = Array(n + 1).fill(0);
    
    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= n; j++) {
            if(floydArr[i][j]) {
                checked[i]++;
                checked[j]++;
            }
        }
    }
    
    return checked.filter((item) => item === n - 1).length;
}