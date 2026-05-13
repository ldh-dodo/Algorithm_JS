function solution(info, query) {
    const answer = [];
    const map = new Map();

    // 1. info의 모든 가능한 조합(16가지)을 미리 Map에 저장
    function combination(parts, score, start) {
        const key = parts.join(""); // 키를 하나로 합침
        if (map.has(key)) map.get(key).push(score);
        else map.set(key, [score]);

        for (let i = start; i < 4; i++) {
            const temp = [...parts];
            temp[i] = "-"; // 와일드카드 처리된 키 생성
            combination(temp, score, i + 1);
        }
    }

    info.forEach((v) => {
        const parts = v.split(" ");
        const score = Number(parts.pop()); // 마지막 점수 분리
        combination(parts, score, 0);
    });

    // 2. 모든 점수 리스트를 미리 "딱 한 번씩만" 정렬
    for (let [key, value] of map) {
        value.sort((a, b) => a - b);
    }

    // 3. 효율적인 이진 탐색 (Lower Bound)
    const getLowerBound = (target, score) => {
        let left = 0;
        let right = target.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2); // Math.floor 대신 비트 연산 (미세 최적화)
            if (target[mid] < score) left = mid + 1;
            else right = mid;
        }
        return target.length - left;
    };

    // 4. 쿼리 처리: 이제 4중 for문 없이 단 한 번의 조회로 끝냄
    query.forEach((q) => {
        // " and "와 공백을 기준으로 점수와 조건을 분리
        const parts = q.replace(/ and /g, "").split(" ");
        const score = Number(parts.pop());
        const key = parts.join("");
        
        const list = map.get(key);
        if (list) {
            answer.push(getLowerBound(list, score));
        } else {
            answer.push(0);
        }
    });

    return answer;
}