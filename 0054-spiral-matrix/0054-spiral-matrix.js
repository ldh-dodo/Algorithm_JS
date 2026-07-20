/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    /**
    Example 1
    0, 1, 2, 5, 8, 7, 6, 3, 4
    
    Example 2
    0, 1, 2, 3, 7, 11, 10, 9, 8, 4, 5, 6

    */

    /**
    visited
    방향 순환(우 -> 하 -> 좌 -> 상)
    */

    const m = matrix.length;
    const n = matrix[0].length;

    const visited = Array.from({length: m}, () => Array.from({length: n}, () => false));
    let visitedCnt = 0;
    const targetCnt = m * n;

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]] // [dy, dx]
    const result = []; // matrix[y][x]
    let y = 0, x = 0, dir = 0;

    while(visitedCnt !== targetCnt) {
        result.push(matrix[y][x]);
        visited[y][x] = true;
        visitedCnt++;

        let [nextY, nextX] = [y + directions[dir][0], x + directions[dir][1]];
        if(nextY < 0 || nextY >= m || nextX < 0 || nextX >= n || visited[nextY][nextX]) {
            dir = (dir + 1) % directions.length;
            [nextY, nextX] = [y + directions[dir][0], x + directions[dir][1]];
        }

        y = nextY;
        x = nextX;
    }

    return result;
};