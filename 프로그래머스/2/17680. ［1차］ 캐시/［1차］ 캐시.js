function solution(cacheSize, cities) {
    /*
        0. cache 크기가 0이라면, cities * 5가 답
        0.5 cities의 대소문자 구분 X, 전부 대문자나 소문자로 바꿔주기.
        1.현재 값이 캐시에 저장되어 있을 때
        1.1 캐시를 참조하고, recentNum 설정하고, 실행시간 1 늘리기
        
        2.현재 값이 캐시에 저장되어 있지 않을 때
        2.1 캐시가 꽉찼다면 LRU 알고리즘 적용, 실행시간 5 늘리기
        2.2 캐시가 꽉차지 않았다면, 캐시에 넣고 실행시간 5 늘리기
    */
    
    let answer = 0;
    let cache = {};
    let recentNum = 0;
    
    if(cacheSize === 0){
        return 5*cities.length;
    }
    
    
    for(let i = 0; i < cities.length; i++){
        cities[i] = cities[i].toLowerCase();
    }
    
    for(let i = 0; i < cities.length; i++){

        
        // 1.1
        if(cache[cities[i]] !== undefined){
            answer++;
            cache[cities[i]] = recentNum++;
            continue;
        }
        
        // 2.1
        if(Object.keys(cache).length >= cacheSize){
            let keys = Object.keys(cache);
            let min = 100001;
            let min_key;
            
            for(let i = 0; i < keys.length; i++){ // LRU. recentNum이 가장 작은것 고르기
                let key = keys[i];
                
                if(cache[key] < min){
                    min = cache[key];
                    min_key = key;
                }
            }
            delete cache[min_key];
            cache[cities[i]] = recentNum++;
            answer+=5;
        } else { // 2.2
            cache[cities[i]] = recentNum++;
            answer+=5;
        }
        
    }
    
    return answer;
}