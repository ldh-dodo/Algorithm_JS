function solution(n, weak, dist) {
    /*
    점검 시간은 1시간이다.
    친구들이 1시간 동안 이동할 수 있는 거리는 제각각이다.
    친구들은 시계, 혹은 반시계 방향으로 외벽을 따라서만 이동한다.
    취약 지점을 점검하기 위해 보내야하는 친구 수의 최소값을 구해야한다.
    위의 조건을 만족하려면, 취약지점부터 시작해서 이동하는게 좋다.
    
    풀이 전략
    두 개의 방향을 고려하지않고, 배열을 두 배로 늘려서 한 방향에 대한 조건만 고려한다.
    1시간 동안 이동할 수 있는 거리가 가장 긴 친구들부터 보내면 최적이다.
    */
    
    const weakLen = weak.length;
    weak = [...weak, ...weak.map((el) => el + n)];
    dist = dist.sort((a, b) => b - a);
    
    for(let i = 1; i <= dist.length; i++) {
        const permutations = getPermutations(dist, i);
        
        for(const per of permutations) {
            for(let j = 0; j < weakLen; j++) {
                let sliceWeak = weak.slice(j, j + weakLen);
                
                for(const p of per) {
                    const checkNum = p + sliceWeak[0];
                    
                    sliceWeak = sliceWeak.filter((el) => el > checkNum);
                    if(sliceWeak.length === 0) return i;
                }
            }
        }
    }
    
    function getPermutations(arr, num) {
        if(num === 1) return arr.map((el) => [el]);
        
        const res = [];
        
        arr.forEach((el, idx, origin) => {
            const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
            const permutations = getPermutations(rest, num - 1);
            const combined = permutations.map((com) => [el, ...com]);
            res.push(...combined);
        });
        
        return res;
    }
    
    return -1;
}