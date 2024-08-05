function solution(people, limit) {
    let answer = 0;

    let i = 0;
    let j = people.length - 1;
    
    people.sort((a , b) => b - a);
    
    while(i <= j){
        if(i === j){
            i++;
            answer++;
            continue;
        }
        let sum = people[i] + people[j];
        if(sum > limit){
            i++;
        } else {
            i++;
            j--;
        }
        answer++;
    }
    
    return answer;
}