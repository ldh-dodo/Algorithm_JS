function solution(info, n, m) {
    const N = info.length;
    const INF = Infinity;

    // memo[i][b] = i번 물건부터 처리할 때, B 누적 흔적이 b인 상태에서 A의 최소 흔적
    const memo = Array.from({ length: N + 1 }, () => new Array(m).fill(-1));

    function dfs(i, b) {
        if (b >= m) return INF;
        if (i === N) return 0;           // 물건 다 나눔 → A가 더 쌓을 흔적 없음
        if (memo[i][b] !== -1) return memo[i][b];

        // 물건 A가 가짐
        const pickA = info[i][0] + dfs(i + 1, b);   
        // 물건 B가 가짐
        const pickB = dfs(i + 1, b + info[i][1]);   
        
        return (memo[i][b] = Math.min(pickA, pickB));
    }

    const ans = dfs(0, 0);
    return ans < n ? ans : -1;
}