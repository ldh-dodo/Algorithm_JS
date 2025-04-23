function solution(n, m, x, y, queries) {
    /*
        0 : 좌
        1 : 우
        2 : 상
        3 : 하
        
        쿼리의 목적지에서 시작해서 갈 수 있는 지점을 역으로 카운트
    */
    const [BASE_X, BASE_Y] = [BigInt(x), BigInt(y)];
    let [minX, maxX, minY, maxY] = [BASE_X, BASE_X, BASE_Y, BASE_Y];
    [m, n] = [BigInt(m), BigInt(n)];
    
    for(let i = queries.length - 1; i >= 0; i--) { // 역추적
        let [dir, dist] = queries[i];
        dist = BigInt(dist);
        
        // x 행 y 열
        if(dir === 0) { // 좌 -> 오른쪽으로 역추적
            // minY 가 0 보다 크다면, 왼쪽 벽에 붙어있지 않으므로 minY도 옮겨줘야 함
            if(minY > 0n) minY += dist;
            maxY = maxY + dist < m ? maxY + dist : m - 1n;
        } else if(dir === 1) {// 우 -> 왼쪽으로 역추적
            // maxY 가 m - 1보다 작다면, 오른쪽 벽에 붙어있지 않으므로 maxY도 옮겨줘야 함
            if(maxY < m - 1n) maxY -= dist;
            minY = minY - dist >= 0 ? minY - dist : 0n;
        } else if(dir === 2) { // 상 -> 아래쪽으로 역추적
            // minX가 0 보다 크다면, 위쪽 벽에 붙어있지 않으므로, minX도 옮겨줘야 함
            if(minX > 0n) minX += dist;
            maxX = maxX + dist < n ? maxX + dist : n - 1n;
        } else if(dir === 3) { // 하 -> 위로 역추적
            // maxX가 n - 1보다 작다면, 아래쪽 벽에 붙어있지 않으므로, maxX도 옮겨줘야 함
            if(maxX < n - 1n) maxX -= dist;
            minX = minX - dist >= 0 ? minX - dist : 0n;
        }
        
        if(minX > maxX || minY > maxY) return 0;
    }
    
    return (maxX - minX + 1n) * (maxY - minY + 1n);
}