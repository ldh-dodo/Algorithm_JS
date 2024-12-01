function hanoi(n, start, work, target, answer) {
    if(n === 1) {
        answer.push([start, target]);
        return;
    }
    
    hanoi(n - 1, start, target, work, answer);
    answer.push([start, target]);
    hanoi(n - 1, work, start, target, answer);
}

function solution(n) {
    var answer = [];
    
    hanoi(n, 1, 2, 3, answer);
    
    return answer;
}