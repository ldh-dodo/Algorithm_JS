

function solution(progresses, speeds) {
    let answer = [];
    let i = 0;
    let days = 1;
    let sequential_flag = false;
    
    // 93 30 55
    // 1 30 5
    
    while(i < progresses.length){
       let progresses_during_days = progresses[i]+ speeds[i] * days;
       if(progresses_during_days < 100){
           days++;
           sequential_flag = false;
           continue;
       } else { // 100 넘었을 때.
           i++;
           if(sequential_flag){ // 연속한지 검사
               answer[answer.length - 1]++;
           } else {
               sequential_flag = true;
               answer.push(1);
           }
       }
    }
    
    return answer;
}