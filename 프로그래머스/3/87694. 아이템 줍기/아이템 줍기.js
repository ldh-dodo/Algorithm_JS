const direction = [
    [-1, 0],  
    [1, 0],   
    [0, -1],  
    [0, 1],   
];


function solution(rectangle, characterX, characterY, itemX, itemY) {
    characterX *= 2;
    characterY *= 2;
    itemX *= 2;
    itemY *= 2;
    
    rectangle = rectangle.map((rect) => rect.map((item) => item * 2));
    let map = Array.from({ length: 102 }, () => Array(102).fill(0));

    for(const [lx, ly, rx, ry] of rectangle) {
        for(let cy = ly; cy <= ry; cy++) {
            for(let cx = lx; cx <= rx; cx++) {
                if(cx === lx || cx === rx || cy === ly || cy === ry) {
                        if(map[cy][cx] !== 2) {
                            map[cy][cx] = 1;
                        }
                    }
                    // 내부는 2으로 표시
                    else {
                        map[cy][cx] = 2;
                    }              
            }
        }
    }
    const res = bfs();
    return res;
    
    function bfs() {
        let visited = Array.from({ length: 102 }, () => Array(102).fill(false));

        const q = [[characterY, characterX, 0]];
        visited[characterY][characterX] = true;
        
        while(q.length > 0) {
            const [curY, curX, dist] = q.shift();
            
            if(curX === itemX && curY === itemY) return dist / 2;
            
            for(const [dx, dy] of direction) {
                const [ny, nx] = [curY + dy, curX + dx];
                
                if(ny < 1 || nx < 1 || ny >= 102 || nx >= 102) continue;
                if(map[ny][nx] !== 1) continue;
                if(visited[ny][nx]) continue;
                
                q.push([ny, nx, dist + 1]);
                visited[ny][nx] = true;
            }
        }    
        return -1;
    }
}