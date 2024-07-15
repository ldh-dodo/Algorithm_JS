function solution(s) {
    var answer = '';
    
    let max = -Infinity;
    let min = Infinity;
    
    let i = 0; 
    
    let num_list = s.split(" ");
    
    num_list.sort((a,b) => a-b);

    console.log(num_list);
    min = num_list[0];
    max = num_list.at(-1);
    
    answer = min + ' ' + max;

    
    return answer;
}