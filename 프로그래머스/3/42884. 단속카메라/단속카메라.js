function solution(routes) {
    /*
    모든 차량이 한 번은 단속용 카메라를 만나도록 하는 최소 단속용 카메라 대수
    route : [진입 시점, 나간 시점]
    
    전략
    - 나간시점이 작은순으로 정렬
    - prevEnd < nextStart 면 겹치지 않는 범위, prevEnd
    
     -19 -16
    -20  -16
   -21   -16
             -14 -13
    */
    routes.sort((a, b) => a[1] - b[1]);
    let answer = 1;
    let [prevSt, prevEnd] = [routes[0][0], routes[0][1]];

    for(let i = 1; i < routes.length; i++) {
        const [curSt, curEnd] = routes[i];
        
        if(prevEnd < curSt) {
            console.log(prevSt,prevEnd, curSt,curEnd);
            answer++;
            [prevSt, prevEnd] = [curSt, curEnd];
        }
    }
    
    return answer;
}