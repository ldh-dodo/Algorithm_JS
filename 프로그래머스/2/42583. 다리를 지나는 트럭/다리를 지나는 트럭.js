function solution(bridge_length, maxWeight, truck_weights) {
    /*
    모든 트럭이 다리를 건너기 위한 최소 시간(초)
    현재 무게 + 다음 무게가 최대 무게보다 적다면, 새로운 트럭이 건너기 시작할 수 있음
    */
    
    let head = 0;
    let totalWeight = 0;
    let sec = 0;

    const curTrucks = []; // [dist, idx]
    let curTrucksIdx = 0;
    
    while(head < truck_weights.length || curTrucksIdx < curTrucks.length) {
        sec++;
        
        for(let i = curTrucksIdx; i < curTrucks.length; i++) {     
            curTrucks[i][0]++;
            const [dist, idx] = curTrucks[i];
            
            if(dist >= bridge_length) {
                curTrucksIdx++;
                totalWeight -= truck_weights[idx];
            }
        }
        
        if(head < truck_weights.length) {
            const curWeight = truck_weights[head];
            
            if(maxWeight >= totalWeight + curWeight) {
                curTrucks.push([0, head]);
                totalWeight += curWeight;
                head++;
            }
        }

    }
    
    return sec;
}