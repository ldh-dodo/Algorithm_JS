// dp[x] : x원을 거슬러줄 수 있는 방법의 수

const MOD = 1000000007;

function solution(n, money) {
    let dp = Array(n + 1).fill(0);
    dp[0] = 1;
    
    for(let coin of money) {
        for(let amount = coin; amount <= n; amount++) {
            dp[amount] += dp[amount - coin] % MOD;
        }
    }
    
    return dp[n];
}