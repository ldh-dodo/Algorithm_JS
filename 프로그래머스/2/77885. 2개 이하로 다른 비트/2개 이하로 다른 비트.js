function solution(numbers) {
    let answer = [];
    for(const number of numbers) {
        let bit = number.toString(2);
        
        /*
        핵심 조건 : x보다 크면서, 비트 차이 2개 이하면서 제일 작은 수
        짝수 -> 마지막 비트 무조건 0 -> 마지막 비트 1로만 변경 -> 원래수 + 1
        홀수 -> 마지막 비트 무조건 1 -> 마지막에서 처음으로 가면서 0인 비트 1로 변경. 없을 경우 맨 앞에 1추가
        */

        
        if(number % 2 === 0) answer.push(number + 1);
        else {            
            const newBit = bit.split('');
            let flag = false;
            for(let i = newBit.length - 2; i >= 0; i--) {
                if(newBit[i] === '0') {
                    newBit[i] = '1';
                    newBit[i + 1] = '0';
                    flag = true;
                    break;
                }
            }
            
            if(!flag) {
                newBit.unshift('1');
                newBit[1] = '0';
            }     
            
            answer.push(parseInt(newBit.join(''), 2));  
        }
    }
    
    return answer;
}