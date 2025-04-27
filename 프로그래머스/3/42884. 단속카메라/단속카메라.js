function solution(routes) {
    let answer = 0;
    let checked = new Set();
    
    // return : 모든 차량이 단속용 카메라를 한 번은 만나도록 하는 최소 카메라 수
    // 1 <= routes.length <= 10,000
    // routes = [진입 지점, 진출 지점]
    // -30,000 <= 진입, 진출 지점 <= 30,000
    
    routes.sort((a,b) => a[1] - b[1]);

    let be = -30001;
    
    for(let i = 0; i < routes.length; i++) {
        const [s, e] = routes[i];
        
        if(s > be) {
            answer++;
            be = e;
        }
    }
    
    
    return answer;
}