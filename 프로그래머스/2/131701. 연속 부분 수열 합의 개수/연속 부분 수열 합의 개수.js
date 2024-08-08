function solution(elements) {
    let answer = 0;
    let elSize = elements.length;
    let arrCheck = {};
    for(let i = 1; i <= elSize; i++){ // 길이
        for(let j = 0; j < elSize; j++){ // 반복하는 개수
            let sum = 0;
            for(let u = 0; u < i; u++){ // 요소 전체를 순회하면서
                let idx = (j + u) >= elSize ? (j+u-elSize) : j+u;
                sum+= elements[idx];
            }
            if(arrCheck[sum] === undefined){
                arrCheck[sum] = true;
                answer++;
            }
        }
    }

    return answer;
}
