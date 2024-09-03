function solution(dirs) {
    /*
    1. U D R L 명령어(dirs)에 따라 움직인다.
    2. 움직이는 동안, "처음" 걸어본 길의 길이의 총합을 구할 것.
    3. 단, 이 때 경계 밖에서 이동하라는 명령은 무시한다.
    */
    
    /*
    "처음" 걸어본 길을 어떻게 처리할 것인가
    
    예를 들어, 시작지점이 (0,0)이라고 할 때, U D R L은 전부 다른 길.
    11x11 크기 2차원 배열을 만들고, 각 지점마다 U D R L 을 push 하거나, 있는지 검사해서 갔던 길인지 검사해보자 
    
    시작 지점을 (5, 5)
    경계는 (0, 0) ~ (10, 10) 사이의 index값
    
    */
    let totalSum = 0;
    
    let d = {
        U : [1,0],
        D : [-1, 0],
        L : [0, -1],
        R : [0, 1],
    }
    
    let maps = new Array(11).fill(null).map(() => new Array(11).fill(null).map(() => []));

    
    let [cy, cx] = [5, 5];
    for(let i = 0; i < dirs.length; i++){
        let key = dirs[i];
        
        let [dy, dx] = d[key];
        
        let [ny, nx] = [cy+dy, cx+dx];
        
        
        if(!(ny >= 0 && ny <= 10 && nx>=0 && nx <=10)) continue;
        
        let reverse_key = null;
        
        Object.keys(d).forEach((key) => {
            let [tdy, tdx] = d[key];
                    
            if(tdy === -dy && tdx === -dx){
                reverse_key = key;
            }
        })
        
        // 초행길일시, 1. 현재 위치 옮겨주기,
        // 2. maps[cy][cx]에 갔던 길이라고 추가해주기
        // 3. 길의 합 더해주기
        // 초행길 아닐시, 1. 현재 위치만 옮겨주기
        
        
        // 체크 못했던 점
        // maps[cy][cx]뿐만 아니라, maps[ny][nx]에서 역방향도 체크해줘야함..
        
        let isVisited = maps[cy][cx].includes(key) && maps[ny][nx].includes(reverse_key);
        
        if(!isVisited){
            maps[cy][cx].push(key);
            maps[ny][nx].push(reverse_key);
            totalSum++;
        }
        
        [cy, cx] = [ny, nx];
    }
    
    
    return totalSum;
}