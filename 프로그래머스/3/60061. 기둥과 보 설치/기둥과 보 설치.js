function solution(n, buildFrame) {
    /*
        [기둥]과 [보]를 이용하여 벽면 구조물을 자동으로 세우는 로봇
        
        [기둥]을 설치할 수 있는 상황
        기둥은 바닥 위에 있어야 함
        기둥은 보의 한쪽 끝 부분 위에 있어야 함
        기둥은 다른 기둥 위에 있어야 함
        
        [보]를 설치할 수 있는 상황
        한쪽 끝 부분이 기둥 위에 있어야 함
        양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 함
        
        기둥과 보를 문자열의 조합인 고유한 키로 저장하는 set을 통해 관리
        
        buildFrame의 작업을 순회하며, 하나의 작업 수행 -> 유효성 검사를 반복하도록한다.
                
        반환 값 형식
        [x, y, a]
        a : 0 -> 기둥 
        a : 1 -> 보
    */
    
    const pillars = new Set();
    const beams = new Set();
    
    for(const [x, y, a, b] of buildFrame) {
        const key = `${x},${y}`;
        
        if(b === 1) { // 설치
            if(a === 0) { // 기둥
                pillars.add(key);
                if(!validate()) pillars.delete(key);
            } else if(a === 1) {
                beams.add(key);
                if(!validate()) beams.delete(key);
            }
        } else { // 삭제
            if(a === 0) { // 기둥
                pillars.delete(key);
                if(!validate()) pillars.add(key);
            } else if(a === 1) {
                beams.delete(key);
                if(!validate()) beams.add(key);
            }
        }
    }
    
    function validate() {
        let isValid = true;
        
        for(const pillarKey of pillars) {
            const [x, y] = pillarKey.split(',').map(Number);
            
            // 기둥은 바닥 위에 있어야 함
            if(y === 0) continue;
            
            // 기둥은 보의 한쪽 끝 부분 위에 있어야 함
            // 기둥 아래 있는 보와 기둥 아래 왼쪽에서 오는 보
            if(beams.has(`${x-1},${y}`) || beams.has(`${x},${y}`)) continue;
            
            // 기둥은 다른 기둥 위에 있을 수 있음
            if(pillars.has(`${x},${y-1}`)) continue;
            
            return false;
        }
        
        for(const beamKey of beams) {
            const [x, y] = beamKey.split(',').map(Number);
            // 한쪽 끝 부분이 기둥 위에 있어야 함
            if(pillars.has(`${x},${y-1}`) || pillars.has(`${x+1},${y-1}`)) continue;
            // 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 함 
            if(beams.has(`${x-1},${y}`) && beams.has(`${x+1},${y}`)) continue;
            
            return false;
        }
        
        return true;
    }
    
    const answer = [];
    
    for(const pillarKey of pillars) {
        const [x, y] = pillarKey.split(',').map(Number);
        answer.push([x, y, 0]);
    }
    
    for(const beamKey of beams) {
        const [x, y] = beamKey.split(',').map(Number);
        answer.push([x, y, 1]);
    }
    
    answer.sort((u, v) => {
        // [x, y, a]
        // x좌표 기준 오름차순, x좌표 같다면 y좌표 기준 오름차순, x, y 좌표가 모두 같다면 기둥이 먼저
        if(u[0] === v[0] && u[1] === v[1]) return u[2] - v[2];
        if(u[0] === v[0]) return u[1] - v[1];
        return u[0] - v[0];
    });
    
    return answer;
}